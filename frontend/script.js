

const expenseForm = document.getElementById('expenseForm');
const expenseList= document.getElementById('expenseList');

const apiURL='http://localhost:4000/expense';

let editId=null;

// page reload hone par purana data localstorage se nikalna
    window.addEventListener('DOMContentLoaded',async ()=>{

        try {
            const response = await axios.get(`${apiURL}/get-expense`);

            response.data.expenses.forEach(expense => {
                addNewExpenseToUI(expense);
            });
        } catch (err) {
            console.log('Error fetching data', err);
        }
    });


//form submit hone par new expense add karna
   expenseForm.addEventListener('submit', async (e)=>{
     e.preventDefault();

      const expenseDetails ={
        
       amount: document.getElementById('amount').value,
        description :document.getElementById('description').value,
        category : document.getElementById('category').value,
        userId: localStorage.getItem('userId')
          
      };

       try{
        
         if(editId){
            await axios.put(`${apiURL}/edit-expense/${editId}`,expenseDetails);
            location.reload();
            editId=null;
            document.querySelector('button[type="submit"]').innerText="Add Expense";
            location.reload();
         }
         else{
            const response = await axios.post(`${apiURL}/add-expense`,expenseDetails);
          
            addNewExpenseToUI(response.data.newExpenseDetail);
         }
         expenseForm.reset();
       }
       catch(err){
        console.log("Error saving data",err);
       }
   });
  


// screen par expense show karna
  function addNewExpenseToUI(expense){
     
     const li = document.createElement('li');
     
     li.className = "list-group-item d-flex justify-content-between align-items-center shadow-sm mb-2";

     li.setAttribute('data-id',expense.id);

     li.innerHTML =`<span><strong>@ ${expense.amount}</strong> - ${expense.category}-${expense.description}</span>
              <div> 
              <button class="btn btn-warning btn-sm edit-btn me-2">Edit</button>
              <button class="btn btn-danger btn-sm delete-btn">Delete</button>
              </div>
     `
      expenseList.appendChild(li)
  }



//delete and edit button
  expenseList.addEventListener('click', async (e)=>{
      
     const li = e.target.closest('li');
     const id = li.getAttribute('data-id');

     if(e.target.classList.contains('delete-btn')){

         try{

            await axios.delete(`${apiURL}/delete-expense/${id}`);
            li.remove();
         }
         catch(err){
            console.log("Error delteing",err);
         }
     }

        if(e.target.classList.contains('edit-btn')){

            const textContent =li.firstElementChild.innerText;

            const parts = textContent.split(' - ');

            document.getElementById('amount').value=parts[0].replace('@','');
            document.getElementById('category').value=parts[1];
            document.getElementById('description').value=parts[2];

             editId = id;
             document.querySelector('button[type="submit"]').innerText = 'Update Expense';
        
        }

  });

    
