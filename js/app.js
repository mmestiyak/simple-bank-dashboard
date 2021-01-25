const loginArea = document.querySelector('.login');
const loginForm = document.querySelector('.login form');
const dashboardArea = document.querySelector('.dashboard');

let totalDeposit = 0;
let totalWithdraw = 0;
let totalBalance = 0;

let depositShow = document.querySelector('.deposit-show');
let balanceShow = document.querySelector('.balance-show');
let withdrawShow = document.querySelector('.withdraw-show');

let NumberRegex = /\d/;



function handleLoginForm(e){
  e.preventDefault();
  e.currentTarget.closest('.login').style.display = 'none';
  dashboardArea.style.display = 'block';
}
loginForm.addEventListener('submit', handleLoginForm);




const depositForm = document.querySelector('form.form-deposit');
function depositFormHandler(e){
  e.preventDefault()
  let deposit = this.deposit.value;
  if(NumberRegex.test(deposit)){
    deposit = Number(deposit)
    totalDeposit+=deposit;
    totalBalance+= deposit;
    balanceShow.dispatchEvent(new CustomEvent('balanceUpdated'));
    depositShow.innerText = totalDeposit; 
    e.currentTarget.reset()
  }
 
}
depositForm.addEventListener('submit', depositFormHandler)


const withdrawForm = document.querySelector('form.form-withdraw');
function withdrawFormHandler(e){
  e.preventDefault();
  let withdraw = e.currentTarget.withdraw.value;
  if(NumberRegex.test(withdraw)){
    withdraw = Number(withdraw);
    if(withdraw < totalBalance && totalWithdraw < totalBalance){
      totalWithdraw+= withdraw;
    }
    totalBalance-= totalWithdraw;
    balanceShow.dispatchEvent(new CustomEvent('balanceUpdated'));
    withdrawShow.innerText = totalWithdraw;
    e.currentTarget.reset()


  }
}

withdrawForm.addEventListener('submit', withdrawFormHandler)






balanceShow.addEventListener('balanceUpdated', (e) => {
  e.currentTarget.innerText = totalBalance;
})