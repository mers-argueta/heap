// Clase para la Cola de Prioridad
class PriorityQueue {
    constructor() {
        this.heap = []; //INICIALIZO UN ARREGLO PARA ALMACENAR MIN HEAPS
    }

    insert(person) {
        this.heap.push(person); //Añade persona
        this.subirHeap(); //reordena
    }

    pop() {
        if (this.size() === 0) return null; //Si va vacío
        const prioridadAlta = this.heap[0]; //guarda el de mayor prioridad
        const ultimo = this.heap.pop(); //sustituye la raíz del heap
        if (this.size() > 0) { 
            this.heap[0] = ultimo;
            this.bajarHeap();  //reordena
        }
        return prioridadAlta;
    }

    size() {
        return this.heap.length; // retorna el tamanio del heap
    }

    //Reordena luego de insertar un nodo, moviendolo hacia arriba, hasta que el heap sea valido
    subirHeap() {
        let index = this.heap.length - 1;
        while (index > 0) { //repite hasta que se restaure la propiedad de min-heap 
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index].priority >= this.heap[parentIndex].priority) break;
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]]; //compara el elemento con su papa y los cambia si tiene prioridad mas alta
            index = parentIndex;
        }
    }
    //Mueve el nodo de remplazo hacia abajo despues de extraer el elemento de mayor prioridad
    bajarHeap() {
        let index = 0;
        while (2 * index + 1 < this.size()) { //repite hasta que se restaure la propiedad del min-heap
            let smallest = 2 * index + 1;
            const right = 2 * index + 2;
            if (right < this.size() && this.heap[right].priority < this.heap[smallest].priority) {
                smallest = right;
            }
            if (this.heap[index].priority <= this.heap[smallest].priority) break;
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]]; //Compara el elemento actual con sus hijos y los cambia con el de mayor prioridad
            index = smallest;
        }
    }
}

// Función para asignar prioridad
function getPrioridad(person) {
    return person.isSenior || person.isPregnant ? 1 : 2;
}

// Crear la cola de prioridad
const farmaciaCola = new PriorityQueue();

// Agregar personas a la cola
const people = [
    { name: "Carlos", isSenior: true, isPregnant: false, priority: getPrioridad({ isSenior: true, isPregnant: false }) },
    { name: "Ana", isSenior: false, isPregnant: true, priority: getPrioridad({ isSenior: false, isPregnant: true }) },
    { name: "Luis", isSenior: false, isPregnant: false, priority: getPrioridad({ isSenior: false, isPregnant: false }) },
    { name: "Marta", isSenior: false, isPregnant: false, priority: getPrioridad({ isSenior: false, isPregnant: false }) },
    { name: "Rosa", isSenior: true, isPregnant: false, priority: getPrioridad({ isSenior: true, isPregnant: false }) }
];

people.forEach(person => farmaciaCola.insert(person));

// Actualizar la vista de la cola
function updateQueueView() {
    const queueDiv = document.getElementById("cola"); //Clientes restantes
    queueDiv.innerHTML = ""; //LIMPIA
    farmaciaCola.heap.forEach(person => {
        const personDiv = document.createElement("div"); //Se crea un div por cada persona en la cola
        personDiv.classList.add("person");
        personDiv.classList.add(person.priority === 1 ? "high-priority" : "normal-priority");
        personDiv.textContent = `${person.name} - Prioridad: ${person.priority === 1 ? "Alta" : "Normal"}`;
        queueDiv.appendChild(personDiv);
    });
    document.getElementById("serveButton").disabled = farmaciaCola.size() === 0; //Habilita y deshabilita el boton
}

// Función para atender a la siguiente persona
function serveNextPerson() {
    const person = farmaciaCola.pop();
    if (person) {
        const servingDiv = document.getElementById("serving"); //Atendidendo a:
        servingDiv.textContent = `${person.name} - Prioridad: ${person.priority === 1 ? "Alta" : "Normal"}`;
    }
    updateQueueView();
}

// Asignar evento al botón de atención
document.getElementById("serveButton").addEventListener("click", serveNextPerson);

// Mostrar la cola inicial
updateQueueView();
// Función para agregar persona desde el formulario
function addPersonToQueue() {
    const name = document.getElementById("name").value;
    const isSenior = document.getElementById("isSenior").checked;
    const isPregnant = document.getElementById("isPregnant").checked;

    if (name.trim() === "") {
        alert("Por favor, ingrese un nombre.");
        return;
    }

    const person = {
        name: name,
        isSenior: isSenior,
        isPregnant: isPregnant,
        priority: getPrioridad({ isSenior, isPregnant })
    };

    farmaciaCola.insert(person);
    updateQueueView();

    // Limpiar formulario
    document.getElementById("name").value = "";
    document.getElementById("isSenior").checked = false;
    document.getElementById("isPregnant").checked = false;
}

document.getElementById("addButton").addEventListener("click", addPersonToQueue);
