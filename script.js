document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email");
  const passInput = document.getElementById("password");
  const loginBtn = document.getElementById("loginBtn");
  const error = document.getElementById("error");

  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      const email = emailInput.value;
      const pass = passInput.value;

      if (email === "admin@example.com" && pass === "123456") {
        localStorage.setItem("role", "admin");
        localStorage.setItem("loggedIn", true);
        window.location.href = "admin.html";
      } else if (email === "user@example.com" && pass === "123456") {
        localStorage.setItem("role", "user");
        localStorage.setItem("loggedIn", true);
        window.location.href = "home.html";
      } else {
        error.textContent = "Sai email hoặc mật khẩu!";
      }
    });
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("role");
      window.location.href = "login.html";
    });
  }

  const role = localStorage.getItem("role");
  const loggedIn = localStorage.getItem("loggedIn");

  if (!loggedIn && (window.location.pathname.includes("admin.html") || window.location.pathname.includes("home.html"))) {
    window.location.href = "login.html";
  }

  if (window.location.pathname.includes("admin.html") && role !== "admin") {
    window.location.href = "home.html";
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let products = JSON.parse(localStorage.getItem("products")) || [];

  const userTable = document.getElementById("userTable");
  const productTable = document.getElementById("productTable");
  const productCards = document.getElementById("productCards");

  const renderUsers = () => {
    if (!userTable) return;
    userTable.innerHTML = "";
    users.forEach((u, i) => {
      userTable.innerHTML += `
        <tr>
          <td>${u.name}</td>
          <td>${u.email}</td>
          <td>${u.role}</td>
          <td>
            <button onclick="deleteUser(${i})" class="neon-btn">Xóa</button>
          </td>
        </tr>`;
    });
  };

  const renderProducts = () => {
    if (!productTable) return;
    productTable.innerHTML = "";
    products.forEach((p, i) => {
      productTable.innerHTML += `
        <tr>
          <td>${p.name}</td>
          <td>${p.price}</td>
          <td>${p.desc}</td>
          <td><img src="${p.image}" width="60"></td>
          <td><button onclick="deleteProduct(${i})" class="neon-btn">Xóa</button></td>
        </tr>`;
    });
  };

  const renderProductCards = () => {
    if (!productCards) return;
    productCards.innerHTML = "";
    products.forEach(p => {
      productCards.innerHTML += `
        <div class="product-card">
          <img src="${p.image}" alt="${p.name}">
          <h4>${p.name}</h4>
          <p>${p.desc}</p>
          <strong>${p.price}₫</strong>
        </div>`;
    });
  };

  const userForm = document.getElementById("userForm");
  if (userForm) {
    userForm.addEventListener("submit", e => {
      e.preventDefault();
      const newUser = {
        name: document.getElementById("name").value,
        email: document.getElementById("emailUser").value,
        role: document.getElementById("role").value,
      };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      userForm.reset();
      renderUsers();
    });
  }

  const productForm = document.getElementById("productForm");
  if (productForm) {
    productForm.addEventListener("submit", e => {
      e.preventDefault();
      const newProduct = {
        name: document.getElementById("pname").value,
        price: document.getElementById("price").value,
        desc: document.getElementById("desc").value,
        image: document.getElementById("image").value,
      };
      products.push(newProduct);
      localStorage.setItem("products", JSON.stringify(products));
      productForm.reset();
      renderProducts();
    });
  }

  renderUsers();
  renderProducts();
  renderProductCards();
});

function deleteUser(i) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.splice(i, 1);
  localStorage.setItem("users", JSON.stringify(users));
  location.reload();
}

function deleteProduct(i) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  products.splice(i, 1);
  localStorage.setItem("products", JSON.stringify(products));
  location.reload();
}
