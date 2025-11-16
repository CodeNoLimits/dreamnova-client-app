#!/usr/bin/env node
/**
 * WORKER PRINCIPAL - SYSTÈME D'AUTOMATISATION
 * Surveille les tâches et exécute les agents automatiquement
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const EventEmitter = require('events');

class AgentWorker extends EventEmitter {
  constructor() {
    super();
    this.statePath = path.join(__dirname, 'agents-state.json');
    this.logsPath = path.join(__dirname, 'logs');
    this.isRunning = false;
    this.watchInterval = null;
    this.lastState = null;
    this.activeProcesses = new Map();
    
    // Créer dossier logs
    if (!fs.existsSync(this.logsPath)) {
      fs.mkdirSync(this.logsPath, { recursive: true });
    }
  }

  // Charger état
  loadState() {
    if (fs.existsSync(this.statePath)) {
      return JSON.parse(fs.readFileSync(this.statePath, 'utf8'));
    }
    return null;
  }

  // Sauvegarder état
  saveState(state) {
    fs.writeFileSync(this.statePath, JSON.stringify(state, null, 2));
  }

  // Logger
  log(message, agent = 'WORKER') {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${agent}] ${message}\n`;
    
    // Console
    console.log(logMessage.trim());
    
    // Fichier
    const logFile = path.join(this.logsPath, `${new Date().toISOString().split('T')[0]}.log`);
    fs.appendFileSync(logFile, logMessage);
  }

  // Exécuter agent
  async executeAgent(agentName, task) {
    this.log(`Exécution: ${agentName} - ${task.description}`, agentName);

    return new Promise((resolve, reject) => {
      const agentPath = path.join(__dirname, agentName);
      let scriptPath = null;
      let args = [];

      // Déterminer le script à exécuter
      switch (agentName) {
        case 'research':
          scriptPath = path.join(agentPath, 'research-web.js');
          break;
        case 'database':
          scriptPath = path.join(agentPath, 'create-metafields.js');
          break;
        case 'style':
          scriptPath = path.join(agentPath, 'create-design-system.js');
          break;
        default:
          this.log(`⚠️ Agent ${agentName} n'a pas de script d'exécution`, agentName);
          resolve({ success: false, reason: 'No script' });
          return;
      }

      if (!fs.existsSync(scriptPath)) {
        this.log(`❌ Script non trouvé: ${scriptPath}`, agentName);
        resolve({ success: false, reason: 'Script not found' });
        return;
      }

      // Exécuter le script
      const process = spawn('node', [scriptPath], {
        cwd: path.dirname(scriptPath),
        stdio: ['pipe', 'pipe', 'pipe']
      });

      const processId = `${agentName}-${task.id}`;
      this.activeProcesses.set(processId, process);

      let stdout = '';
      let stderr = '';

      process.stdout.on('data', (data) => {
        stdout += data.toString();
        this.log(data.toString().trim(), agentName);
      });

      process.stderr.on('data', (data) => {
        stderr += data.toString();
        this.log(`ERROR: ${data.toString().trim()}`, agentName);
      });

      process.on('close', (code) => {
        this.activeProcesses.delete(processId);
        
        if (code === 0) {
          this.log(`✅ Tâche complétée: ${task.description}`, agentName);
          resolve({ success: true, stdout, stderr });
        } else {
          this.log(`❌ Tâche échouée (code ${code}): ${task.description}`, agentName);
          resolve({ success: false, code, stdout, stderr });
        }
      });

      process.on('error', (error) => {
        this.activeProcesses.delete(processId);
        this.log(`❌ Erreur d'exécution: ${error.message}`, agentName);
        reject(error);
      });
    });
  }

  // Traiter une tâche
  async processTask(agentName, task) {
    if (task.status !== 'assigned') {
      return;
    }

    this.log(`📋 Traitement tâche: ${task.description}`, agentName);

    // Marquer comme "in_progress"
    const state = this.loadState();
    if (state && state[agentName]) {
      const taskIndex = state[agentName].tasks.findIndex(t => t.id === task.id);
      if (taskIndex !== -1) {
        state[agentName].tasks[taskIndex].status = 'in_progress';
        state[agentName].tasks[taskIndex].startedAt = new Date().toISOString();
        state[agentName].status = 'active';
        this.saveState(state);
      }
    }

    // Exécuter l'agent
    try {
      const result = await this.executeAgent(agentName, task);

      // Mettre à jour l'état
      const updatedState = this.loadState();
      if (updatedState && updatedState[agentName]) {
        const taskIndex = updatedState[agentName].tasks.findIndex(t => t.id === task.id);
        if (taskIndex !== -1) {
          if (result.success) {
            updatedState[agentName].tasks[taskIndex].status = 'completed';
            updatedState[agentName].tasks[taskIndex].completedAt = new Date().toISOString();
            updatedState[agentName].tasks[taskIndex].result = result;
          } else {
            updatedState[agentName].tasks[taskIndex].status = 'failed';
            updatedState[agentName].tasks[taskIndex].failedAt = new Date().toISOString();
            updatedState[agentName].tasks[taskIndex].error = result;
          }
          this.saveState(updatedState);
        }
      }

      this.emit('taskCompleted', { agentName, task, result });
    } catch (error) {
      this.log(`❌ Erreur: ${error.message}`, agentName);
      
      // Marquer comme failed
      const state = this.loadState();
      if (state && state[agentName]) {
        const taskIndex = state[agentName].tasks.findIndex(t => t.id === task.id);
        if (taskIndex !== -1) {
          state[agentName].tasks[taskIndex].status = 'failed';
          state[agentName].tasks[taskIndex].failedAt = new Date().toISOString();
          state[agentName].tasks[taskIndex].error = error.message;
          this.saveState(state);
        }
      }

      this.emit('taskFailed', { agentName, task, error });
    }
  }

  // Traiter toutes les tâches assignées
  async processAllTasks() {
    const state = this.loadState();
    if (!state) {
      this.log('⚠️ Aucun état trouvé');
      return;
    }

    for (const [agentName, agentData] of Object.entries(state)) {
      if (!agentData.tasks || agentData.tasks.length === 0) {
        continue;
      }

      // Traiter les tâches "assigned"
      const assignedTasks = agentData.tasks.filter(t => t.status === 'assigned');
      
      for (const task of assignedTasks) {
        // Ne traiter qu'une tâche à la fois par agent
        const inProgressTasks = agentData.tasks.filter(t => t.status === 'in_progress');
        if (inProgressTasks.length > 0) {
          this.log(`⏳ Agent ${agentName} a déjà une tâche en cours`, agentName);
          continue;
        }

        await this.processTask(agentName, task);
        
        // Pause entre les tâches
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  }

  // Démarrer le worker
  start() {
    if (this.isRunning) {
      this.log('⚠️ Worker déjà en cours d\'exécution');
      return;
    }

    this.isRunning = true;
    this.log('🚀 Worker démarré - Surveillance des tâches...');

    // Traiter immédiatement
    this.processAllTasks();

    // Surveiller les changements toutes les 10 secondes
    this.watchInterval = setInterval(() => {
      const currentState = this.loadState();
      
      // Vérifier si l'état a changé
      if (JSON.stringify(currentState) !== JSON.stringify(this.lastState)) {
        this.log('📝 État modifié détecté - Traitement des nouvelles tâches...');
        this.lastState = JSON.parse(JSON.stringify(currentState));
        this.processAllTasks();
      }
    }, 10000); // 10 secondes

    // Surveiller aussi les changements de fichier
    if (fs.existsSync(this.statePath)) {
      fs.watchFile(this.statePath, { interval: 5000 }, () => {
        this.log('📝 Fichier agents-state.json modifié - Traitement...');
        this.processAllTasks();
      });
    }

    this.log('✅ Worker actif - Surveillance en cours');
  }

  // Arrêter le worker
  stop() {
    if (!this.isRunning) {
      return;
    }

    this.isRunning = false;
    this.log('🛑 Arrêt du worker...');

    // Arrêter l'intervalle
    if (this.watchInterval) {
      clearInterval(this.watchInterval);
      this.watchInterval = null;
    }

    // Arrêter la surveillance du fichier
    if (fs.existsSync(this.statePath)) {
      fs.unwatchFile(this.statePath);
    }

    // Arrêter tous les processus actifs
    for (const [processId, process] of this.activeProcesses.entries()) {
      this.log(`🛑 Arrêt du processus: ${processId}`);
      process.kill();
    }
    this.activeProcesses.clear();

    this.log('✅ Worker arrêté');
  }

  // Obtenir le statut
  getStatus() {
    const state = this.loadState();
    const status = {
      isRunning: this.isRunning,
      activeProcesses: this.activeProcesses.size,
      agents: {}
    };

    if (state) {
      for (const [agentName, agentData] of Object.entries(state)) {
        const tasks = agentData.tasks || [];
        status.agents[agentName] = {
          total: tasks.length,
          assigned: tasks.filter(t => t.status === 'assigned').length,
          inProgress: tasks.filter(t => t.status === 'in_progress').length,
          completed: tasks.filter(t => t.status === 'completed').length,
          failed: tasks.filter(t => t.status === 'failed').length
        };
      }
    }

    return status;
  }
}

// Si exécuté directement
if (require.main === module) {
  const worker = new AgentWorker();

  // Gestion des signaux
  process.on('SIGINT', () => {
    worker.stop();
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    worker.stop();
    process.exit(0);
  });

  // Événements
  worker.on('taskCompleted', ({ agentName, task, result }) => {
    console.log(`\n🎉 Tâche complétée: ${agentName} - ${task.description}\n`);
  });

  worker.on('taskFailed', ({ agentName, task, error }) => {
    console.log(`\n❌ Tâche échouée: ${agentName} - ${task.description}\n`);
    console.log(`Erreur: ${error}\n`);
  });

  // Démarrer
  worker.start();

  // Afficher le statut toutes les 30 secondes
  setInterval(() => {
    const status = worker.getStatus();
    console.log('\n📊 STATUT WORKER:');
    console.log(`  Running: ${status.isRunning}`);
    console.log(`  Processus actifs: ${status.activeProcesses}`);
    for (const [agentName, agentStatus] of Object.entries(status.agents)) {
      if (agentStatus.total > 0) {
        console.log(`  ${agentName}: ${agentStatus.completed}/${agentStatus.total} complétées`);
      }
    }
    console.log('');
  }, 30000);
}

module.exports = AgentWorker;

