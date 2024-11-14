// Clase para la Cola de Prioridad
class PriorityQueue {
    constructor() {
        this.heap = [];
    }

    insert(person) {
        this.heap.push(person);
        this._heapifyUp();
    }

    pop() {
        if (this.size() === 0) return null;
        const highestPriorityPerson = this.heap[0];
        const last = this.heap.pop();
        if (this.size() > 0) {
            this.heap[0] = last;
            this._heapifyDown();
        }
        return highestPriorityPerson;
    }

    size() {
        return this.heap.length;
    }

    _heapifyUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index].priority >= this.heap[parentIndex].priority) break;
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }

    _heapifyDown() {
        let index = 0;
        while (2 * index + 1 < this.size()) {
            let smallest = 2 * index + 1;
            const right = 2 * index + 2;
            if (right < this.size() && this.heap[right].priority < this.heap[smallest].priority) {
                smallest = right;
            }
            if (this.heap[index].priority <= this.heap[smallest].priority) break;
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
}

// Función para asignar prioridad
function getPriority(person) {
    return person.isSenior || person.isPregnant ? 1 : 2;
}

// Crear la cola de prioridad
const pharmacyQueue = new PriorityQueue();

// Agregar personas a la cola
const people = [
    { name: "Carlos", isSenior: true, isPregnant: false, priority: getPriority({ isSenior: true, isPregnant: false }) },
    { name: "Ana", isSenior: false, isPregnant: true, priority: getPriority({ isSenior: false, isPregnant: true }) },
    { name: "Luis", isSenior: false, isPregnant: false, priority: getPriority({ isSenior: false, isPregnant: false }) },
    { name: "Marta", isSenior: false, isPregnant: false, priority: getPriority({ isSenior: false, isPregnant: false }) },
    { name: "Rosa", isSenior: true, isPregnant: false, priority: getPriority({ isSenior: true, isPregnant: false }) }
];

people.forEach(person => pharmacyQueue.insert(person));

// Actualizar la vista de la cola en el DOM
function updateQueueView() {
    const queueDiv = document.getElementById("queue");
    queueDiv.innerHTML = "";
    pharmacyQueue.heap.forEach(person => {
        const personDiv = document.createElement("div");
        personDiv.classList.add("person");
        personDiv.classList.add(person.priority === 1 ? "high-priority" : "normal-priority");
        personDiv.textContent = `${person.name} - Prioridad: ${person.priority === 1 ? "Alta" : "Normal"}`;
        queueDiv.appendChild(personDiv);
    });
    document.getElementById("serveButton").disabled = pharmacyQueue.size() === 0;
}

// Función para atender a la siguiente persona
function serveNextPerson() {
    const person = pharmacyQueue.pop();
    if (person) {
        const servingDiv = document.getElementById("serving");
        servingDiv.textContent = `${person.name} - Prioridad: ${person.priority === 1 ? "Alta" : "Normal"}`;
    }
    updateQueueView();
}

// Asignar evento al botón de atención
document.getElementById("serveButton").addEventListener("click", serveNextPerson);

// Mostrar la cola inicial
updateQueueView();
