const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');
const apiURL = 'http://localhost:4000/expense';
let editId = null;

// page reload hone par purana data localstorage se nikalna
window.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await axios.get(`${apiURL}/get-expense`);
    response.data.expenses.forEach(expense => {
      addNewExpenseToUI(expense);
    });
  } catch (err) {
    console.log('Error fetching data', err);
  }
});

// form submit hone par new expense add karna
expenseForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const expenseDetails = {
    amount: document.getElementById('amount').value,
    description: document.getElementById('description').value,
    category: document.getElementById('category').value
  };

  console.log("detais being sent:", expenseDetails)

  try {

    if (editId) {
      const response = await axios.put(`${apiURL}/edit-expense/${editId}`, expenseDetails);

      updateExpenseInUI(response.data);

      editId = null;
      document.querySelector('button[type="submit"]').innerText = "Add Expense";
    } else {
      const response = await axios.post(`${apiURL}/add-expense`, expenseDetails);
      addNewExpenseToUI(response.data.newExpenseDetail);
    }
    expenseForm.reset();

  }

  catch (err) {
    console.log("Error saving data", err);
  }
});

// screen par expense show karna
function addNewExpenseToUI(expense) {
  const categoryName = expense.Category?.name || 'Unknown';


  const expenseElement = document.createElement('li');
  expenseElement.id = `expense-${expense.id}`;
  expenseElement.className = "list-group-item d-flex justify-content-between align-items-center";

  // set data attributes for edit/delete
  expenseElement.setAttribute('data-id', expense.id);
  expenseElement.setAttribute('data-amount', expense.amount);
  expenseElement.setAttribute('data-description', expense.description);
  expenseElement.setAttribute('data-category', categoryName);

  expenseElement.innerHTML = `
    <span class="amount">${expense.amount}</span>
    <span class="description">${expense.description}</span>
    <span class="category">${categoryName}</span>
    <div>
      <button class="btn btn-sm btn-warning edit-btn">Edit</button>
      <button class="btn btn-sm btn-danger delete-btn">Delete</button>
    </div>
  `;

  document.getElementById('expenseList').appendChild(expenseElement);
}



function updateExpenseInUI(updatedExpense) {
  const expenseElement = document.getElementById(`expense-${updatedExpense.id}`);
  if (expenseElement) {
    expenseElement.querySelector('.amount').innerText = updatedExpense.amount;
    expenseElement.querySelector('.description').innerText = updatedExpense.description;
    expenseElement.querySelector('.category').innerText = updatedExpense.Category?.name || 'Unknown';
  }
}

// delete and edit button
expenseList.addEventListener('click', async (e) => {
  const li = e.target.closest('li');
  const id = li.getAttribute('data-id');
  if (e.target.classList.contains('delete-btn')) {
    try {
      await axios.delete(`${apiURL}/delete-expense/${id}`);
      li.remove();
    }
    catch (err) {
      console.log("Error delteing", err);
    }
  }
  if (e.target.classList.contains('edit-btn')) {
    const textContent = li.firstElementChild.innerText;
    document.getElementById('amount').value = li.getAttribute('data-amount');
    document.getElementById('category').value = li.getAttribute('data-category');
    document.getElementById('description').value = li.getAttribute('data-description');
    editId = id;
    document.querySelector('button[type="submit"]').innerText = 'Update Expense';
  }
});
