// Clase Producto
class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

// Variables y constantes
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const totalElement = document.getElementById('total');
const cartListElement = document.getElementById('cart-list');
const productListElement = document.getElementById('product-list');
const payBtn = document.getElementById('pay-btn');

// Función para cargar productos desde el archivo JSON
async function cargarProductos() {
    try {
        const response = await fetch('productos.json');
        const productos = await response.json();
        renderizarProductos(productos);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

// Función para renderizar la lista de productos en el DOM
function renderizarProductos(productos) {
    productListElement.innerHTML = ''; // Limpiar la lista antes de agregar productos
    productos.forEach((producto) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        li.innerHTML = `${producto.nombre} - $${producto.precio} 
            <button class="btn btn-primary add-to-cart" data-product="${producto.nombre}" data-price="${producto.precio}">Agregar</button>`;
        productListElement.appendChild(li);
    });

    // Asignar eventos a los botones de agregar después de renderizar los productos
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const nombre = event.target.getAttribute('data-product');
            const precio = parseFloat(event.target.getAttribute('data-price'));
            const nuevoProducto = new Producto(nombre, precio);
            agregarAlCarrito(nuevoProducto);
        });
    });
}

// Función para actualizar el total del carrito
function actualizarTotal() {
    const total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
    totalElement.innerText = total.toFixed(2);
}

// Función para renderizar el carrito en el DOM
function renderizarCarrito() {
    cartListElement.innerHTML = ''; 
    carrito.forEach((producto) => {
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
    guardarCarritoEnLocalStorage();
}

// Evento para pagar usando SweetAlert
payBtn.addEventListener('click', () => {
    if (carrito.length > 0) {
        Swal.fire({
            title: 'Compra realizada',
            text: `Gracias por su compra. Total a pagar: $${totalElement.innerText}`,
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            carrito.length = 0;
            renderizarCarrito();
            actualizarTotal();
            localStorage.removeItem('carrito');
        });
    } else {
        Swal.fire({
            title: 'Carrito vacío',
            text: 'No tienes productos en el carrito.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
});

// Función para guardar el carrito en el localStorage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para cargar el carrito desde el localStorage
function cargarCarritoDesdeLocalStorage() {
    renderizarCarrito();
    actualizarTotal();
}

// Cargar carrito y productos al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarCarritoDesdeLocalStorage();
    cargarProductos(); // Cargar los productos desde el archivo JSON
});
