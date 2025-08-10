const description = document.getElementById('description');
const btn = document.getElementById('but');
const amount = document.getElementById('amount');
const exp = document.querySelector('.expenses');
const totalexp = document.getElementById('total');
const data = document.getElementById('date');

btn.addEventListener('click', (e) => {
    e.preventDefault();

    const desValue = description.value.trim();
    const amtValue = Number(amount.value);
    const today = data.value;

    if (!desValue) {
        alert('Give a description');
        return;
    }
    if (!amtValue || amtValue <= 0) {
        alert('You must enter a valid amount');
        return;
    }
    if (!today) {
        alert('Enter date');
        return;
    }

    const li = document.createElement('li');
    li.classList.add('expense');
    li.innerHTML = `
        Product: ${desValue}<br>
        Amount: ${amtValue}<br>
        Date: ${today}
    `;

    const btnEdit = document.createElement('button');
    btnEdit.textContent = 'Edit';
    btnEdit.classList.add('but');

    const btnDelete = document.createElement('button');
    btnDelete.textContent = 'Delete';
    btnDelete.classList.add('but');

    li.appendChild(btnEdit);
    li.appendChild(btnDelete);
    exp.appendChild(li);

    updateTotal();

    btnDelete.addEventListener('click', () => {
        li.remove();
        updateTotal();
    });

    btnEdit.addEventListener('click', () => {
        const newAmount = Number(prompt('Edit Amount', amtValue));
        if (!newAmount || newAmount <= 0) {
            alert('Invalid amount');
            return;
        }
        li.innerHTML = `
            Product: ${desValue}<br>
            Amount: ${newAmount}<br>
            Date: ${today}
        `;
        li.appendChild(btnEdit);
        li.appendChild(btnDelete);
        updateTotal();
    });

    description.value = '';
    amount.value = '';
    data.value = '';
});

function updateTotal() {
    const allLis = document.querySelectorAll('.expenses li');
    let total = 0;

    allLis.forEach(li => {
        const amtMatch = li.innerText.match(/Amount:\s*(\d+)/);
        if (amtMatch) {
            total += Number(amtMatch[1]);
        }
    });

    totalexp.textContent = total.toFixed(2);
}
