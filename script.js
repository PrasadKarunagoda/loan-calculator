const loanAmountTextElement = document.querySelector('#data-loan-amount')
const interestRateTextElement = document.querySelector('#interest-rate')
const periodTextElement = document.querySelector('#period')
const button = document.querySelector('#button')
const installmentElement = document.querySelector('#installment')

button.addEventListener('click', button => {
    const installment = calculate(
        parseInt(loanAmountTextElement.value),
        parseFloat(interestRateTextElement.value),
        parseInt(periodTextElement.value))
    installmentElement.innerText = formatNumber(installment)
})

function formatNumber(number) {
    const fixedDecimals = number.toFixed(2)
    const integerPart = parseFloat(fixedDecimals.split('.')[0]).toLocaleString('en', {maximumFractionDigits:0})
    return `${integerPart}.${fixedDecimals.split('.')[1]}`
}

function calculate(loanAmount, interestRate, period) {
    const totalInterest = (loanAmount * interestRate * 0.01 / 12) * period
    const startingInstallment = (loanAmount + (totalInterest / 2)) / 36
    //console.log(`startingInstallment ${startingInstallment}`)

    let remainingLoanAmount
    let installment = startingInstallment
    let iteration = 1
    while (true) {
        remainingLoanAmount = loanAmount
        console.log(`installment ${installment}`)
        for (let i = 0; i < 36; i++) {
            const interest = (remainingLoanAmount * interestRate * 0.01) / 12
            //console.log(`${iteration},${i}`)
            //console.log(`interest ${interest}`)
            const capitalPayment = installment - interest
            //console.log(`capitalPayment ${capitalPayment}`)
            remainingLoanAmount = remainingLoanAmount - capitalPayment
            console.log(`remainingLoanAmount ${remainingLoanAmount}`)
        }
        iteration++
        if (iteration > 20) {
            console.error('Looping too many times.')
            return -1
        }
        if (Math.abs(remainingLoanAmount) > 0.01) {
            installment = installment + (remainingLoanAmount / period)
            console.log('')
        }
        else {
            break
        }
    }
    return installment
}

//TODO Remove
//loanAmountTextElement.value = 3500000
//interestRateTextElement.value = 13.75
//periodTextElement.value = 36
