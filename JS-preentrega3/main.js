// Clase Producto
class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }

    // Método para mostrar el producto en formato JSON
    toJSON() {
        return JSON.stringify({
            nombre: this.nombre,
            precio: this.precio
        });
    }
}

// Variables y constantes
const carrito = [];
const totalElement = document.getElementById('total');
const cartListElement = document.getElementById('cart-list');
const payBtn = document.getElementById('pay-btn');

// Función para actualizar el total del carrito
function actualizarTotal() {
    const total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
    totalElement.innerText = total.toFixed(2);
    guardarCarritoEnLocalStorage();
}

// Función para renderizar el carrito en el DOM
function renderizarCarrito() {
    cartListElement.innerHTML = ''; // Limpiar la lista del carrito
    carrito.forEach((producto, index) => {
        const li = document.createElement('li');
        li.innerText = `${producto.nombre} - $${producto.precio}`;
        cartListElement.appendChild(li);
    });
}

// Función para agregar productos al carrito
function agregarAlCarrito(producto) {
    carrito.push(producto);
    renderizarCarrito();
    actualizarTotal();
}

// Evento para agregar productos al carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        const nombre = event.target.getAttribute('data-product');
        const precio = parseFloat(event.target.getAttribute('data-price'));
        const nuevoProducto = new Producto(nombre, precio);
        agregarAlCarrito(nuevoProducto);
    });
});

// Evento para pagar
payBtn.addEventListener('click', () => {
    if (carrito.length > 0) {
        console.log('Gracias por su compra.')
        carrito.length = 0; // Vaciar el carrito
        renderizarCarrito();
        actualizarTotal();
        localStorage.removeItem('carrito');
    } else {
        console.log('El carrito esta vacio.');
    }
});

// Función para guardar el carrito en el localStorage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito.map(producto => producto.toJSON())));
}

// Función para cargar el carrito desde el localStorage
function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        const productos = JSON.parse(carritoGuardado);
        productos.forEach(productoData => {
            const producto = new Producto(productoData.nombre, parseFloat(productoData.precio));
            carrito.push(producto);
        });
        renderizarCarrito();
        actualizarTotal();
    }
}

// Cargar carrito al iniciar la página
document.addEventListener('DOMContentLoaded', cargarCarritoDesdeLocalStorage);
