#!/usr/bin/env node
/**
 * SYSTÈME DE QUEUE - GESTION DES TÂCHES
 * File d'attente pour les tâches des agents
 */

const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

class TaskQueue extends EventEmitter {
  constructor() {
    super();
    this.queuePath = path.join(__dirname, 'queue.json');
    this.queue = [];
    this.processing = false;
    this.maxConcurrent = 3; // Maximum 3 tâches en parallèle
    this.currentProcessing = new Set();
  }

  // Charger la queue
  load() {
    if (fs.existsSync(this.queuePath)) {
      this.queue = JSON.parse(fs.readFileSync(this.queuePath, 'utf8'));
    } else {
      this.queue = [];
      this.save();
    }
  }

  // Sauvegarder la queue
  save() {
    fs.writeFileSync(this.queuePath, JSON.stringify(this.queue, null, 2));
  }

  // Ajouter une tâche à la queue
  enqueue(task) {
    const queueItem = {
      id: Date.now() + Math.random(),
      task,
      status: 'pending',
      createdAt: new Date().toISOString(),
      priority: task.priority || 0
    };

    this.queue.push(queueItem);
    this.queue.sort((a, b) => b.priority - a.priority); // Trier par priorité
    this.save();

    this.emit('enqueued', queueItem);
    this.process();

    return queueItem.id;
  }

  // Retirer une tâche de la queue
  dequeue() {
    const item = this.queue.find(q => q.status === 'pending');
    if (item) {
      item.status = 'processing';
      item.startedAt = new Date().toISOString();
      this.save();
      return item;
    }
    return null;
  }

  // Marquer comme complétée
  complete(queueId, result) {
    const item = this.queue.find(q => q.id === queueId);
    if (item) {
      item.status = 'completed';
      item.completedAt = new Date().toISOString();
      item.result = result;
      this.save();
      this.currentProcessing.delete(queueId);
      this.emit('completed', item);
      this.process();
    }
  }

  // Marquer comme échouée
  fail(queueId, error) {
    const item = this.queue.find(q => q.id === queueId);
    if (item) {
      item.status = 'failed';
      item.failedAt = new Date().toISOString();
      item.error = error;
      this.save();
      this.currentProcessing.delete(queueId);
      this.emit('failed', item);
      this.process();
    }
  }

  // Traiter la queue
  async process() {
    if (this.processing) {
      return;
    }

    if (this.currentProcessing.size >= this.maxConcurrent) {
      return;
    }

    const item = this.dequeue();
    if (!item) {
      this.processing = false;
      return;
    }

    this.processing = true;
    this.currentProcessing.add(item.id);

    this.emit('processing', item);

    // Simuler le traitement (sera remplacé par l'exécution réelle)
    try {
      // Ici, on émettra un événement pour que le worker traite la tâche
      this.emit('taskReady', item);
    } catch (error) {
      this.fail(item.id, error.message);
    }
  }

  // Obtenir le statut
  getStatus() {
    return {
      total: this.queue.length,
      pending: this.queue.filter(q => q.status === 'pending').length,
      processing: this.queue.filter(q => q.status === 'processing').length,
      completed: this.queue.filter(q => q.status === 'completed').length,
      failed: this.queue.filter(q => q.status === 'failed').length,
      currentProcessing: this.currentProcessing.size
    };
  }

  // Nettoyer les tâches complétées (garder les 100 dernières)
  cleanup() {
    const completed = this.queue.filter(q => q.status === 'completed');
    const failed = this.queue.filter(q => q.status === 'failed');
    
    // Garder les 100 dernières tâches complétées
    if (completed.length > 100) {
      const toKeep = completed.slice(-100);
      const toRemove = completed.slice(0, completed.length - 100);
      
      this.queue = this.queue.filter(q => 
        !toRemove.some(tr => tr.id === q.id)
      );
      this.save();
    }

    // Garder les 50 dernières tâches échouées
    if (failed.length > 50) {
      const toKeep = failed.slice(-50);
      const toRemove = failed.slice(0, failed.length - 50);
      
      this.queue = this.queue.filter(q => 
        !toRemove.some(tr => tr.id === q.id)
      );
      this.save();
    }
  }
}

module.exports = TaskQueue;

