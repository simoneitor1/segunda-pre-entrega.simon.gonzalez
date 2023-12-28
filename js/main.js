const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector(
	'.container-cart-products'
);

btnCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('hidden-cart');
});



/* ========================= */
const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');



// Lista de todos los contenedores de productos
const productsList = document.querySelector('.container-items');

// Variable de arreglos de Productos
let allProducts = [];

const valorTotal = document.querySelector('.total-pagar');

const countProducts = document.querySelector('#contador-productos');

const cartEmpty = document.querySelector('.cart-empty');

const cartTotal = document.querySelector('.cart-total');


productsList.addEventListener('click', e => {
	if (e.target.classList.contains('btn-add-cart')) {
		const product = e.target.parentElement;

		const infoProduct = {
			quantity: 1,
			title: product.querySelector('h2').textContent,
			price: product.querySelector('p').textContent,
		};

		const exits = allProducts.some(
			product => product.title === infoProduct.title
		);

		if (exits) {
			const products = allProducts.map(product => {
				if (product.title === infoProduct.title) {
					product.quantity++;
					return product;
				} else {
					return product;
				}
			});
			allProducts = [...products];
		} else {
			allProducts = [...allProducts, infoProduct];
		}

		showHTML();
	}
});



rowProduct.addEventListener('click', e => {
	if (e.target.classList.contains('icon-close')) {
		const product = e.target.parentElement;
		const title = product.querySelector('p').textContent;

		allProducts = allProducts.filter(
			product => product.title !== title
		);


		console.log(allProducts);


		showHTML();
	}
});

// Funcion para mostrar  HTML

const showHTML = () => {
	if (!allProducts.length) {
		cartEmpty.classList.remove('hidden');
		rowProduct.classList.add('hidden');
		cartTotal.classList.add('hidden');
	} 
    else {
		cartEmpty.classList.add('hidden');
		rowProduct.classList.remove('hidden');
		cartTotal.classList.remove('hidden');
	}

	// Limpiar HTML

	rowProduct.innerHTML = '';

	let total = 0;
	let totalOfProducts = 0;

	allProducts.forEach(product => {
		const containerProduct = document.createElement('div');
		containerProduct.classList.add('cart-product');

		containerProduct.innerHTML = 
        `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;

		rowProduct.append(containerProduct);

		total =
			total + parseInt(product.quantity * product.price.slice(1));
		totalOfProducts = totalOfProducts + product.quantity;
	});

	valorTotal.innerText = `$${total}`;
	countProducts.innerText = totalOfProducts;
};





let comentarios = [];
const listaComentarios = document.querySelector("#lista-comentarios");
let formulario = document.querySelector("#formulario");

function agregarComentario(evt) {
  evt.preventDefault();
  const comentario = document.querySelector("#comentario").value;

  if (comentario === "") {
    alert("Error: Completar el campo comentario");
    return;
  }
  const comentarioObj = {
    id: Date.now(),
    texto: comentario,
  };
  comentarios.push(comentarioObj);
  formulario.reset();
  crearHTML();
}
function crearHTML() {
  limpiarHTML();
  comentarios.forEach((item) => {
    const btnBorrar = document.createElement("a");
    btnBorrar.className = "borrar-comentario";
    btnBorrar.textContent = " ❎ ";

    const li = document.createElement("li");
    li.textContent = item.texto;
    li.dataset.comentarioId = item.id;
    li.appendChild(btnBorrar);
    listaComentarios.appendChild(li);
  });
  sincronizarStorage();
}
function limpiarHTML() {
  while (listaComentarios.firstChild) {
    listaComentarios.removeChild(listaComentarios.firstChild);
  }
}
function borrarComentario(evt) {
  evt.preventDefault();
  const id = evt.target.parentElement.dataset.comentarioId;
  comentarios = comentarios.filter((comentario) => comentario.id != id);
  crearHTML();
}
function sincronizarStorage() {
  localStorage.setItem("comentarios", JSON.stringify(comentarios));
}
window.addEventListener("DOMContentLoaded", () => {
  comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
  crearHTML();
});
formulario.addEventListener("submit", agregarComentario);
listaComentarios.addEventListener("click", borrarComentario);


