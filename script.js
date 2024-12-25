let cashBalance = 1000; 
let assetsOwned = 0; 
let assetPrice = 100; 
let totalReturn = 0; 
let purchasePrice = 0; 


const cashBalanceElement = document.getElementById('cashBalance');
const assetsOwnedElement = document.getElementById('assetsOwned');
const returnElement = document.getElementById('return');
const buyButton = document.getElementById('buy');
const sellButton = document.getElementById('sell');
const assetQuantityInput = document.getElementById('assetQuantity');


const ctx = document.getElementById('marketChart').getContext('2d');

let marketPrices = [assetPrice]; 
const marketChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: Array.from({ length: marketPrices.length }, (_, i) => i),
        datasets: [{
            label: 'Market Price',
            data: marketPrices,
            borderColor: '#000000',
            borderWidth: 2,
            fill: false,
        }],
    },
    options: {
        responsive: true,
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Time',
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Price',
                },
                min: 0,
            },
        },
    },
});

function generatePriceChange() {
    const change = Math.random() * 10 - 5; 
    return change;
}

function updateMarket() {
    const priceChange = generatePriceChange();
    const newPrice = marketPrices[marketPrices.length - 1] + priceChange;
    marketPrices.push(newPrice);
    
    marketChart.data.labels.push(marketPrices.length - 1);
    marketChart.data.datasets[0].data = marketPrices;
    marketChart.update();

    assetPrice = newPrice;
}

buyButton.addEventListener('click', () => {
    const quantity = parseInt(assetQuantityInput.value);
    if (isNaN(quantity) || quantity <= 0) {
        alert("Please enter a valid quantity of assets.");
        return;
    }
    
    const totalCost = assetPrice * quantity;
    if (cashBalance >= totalCost) {
        assetsOwned += quantity;
        cashBalance -= totalCost; 
        purchasePrice = assetPrice;
        cashBalanceElement.textContent = cashBalance.toFixed(2);
        assetsOwnedElement.textContent = assetsOwned;
    } else {
        alert("Not enough cash to buy the asset.");
    }
    updateMarket();
});

sellButton.addEventListener('click', () => {
    const quantity = parseInt(assetQuantityInput.value);
    if (isNaN(quantity) || quantity <= 0) {
        alert("Please enter a valid quantity of assets.");
        return;
    }
    
    const totalRevenue = assetPrice * quantity;
    if (assetsOwned >= quantity) {
        assetsOwned -= quantity;
        cashBalance += totalRevenue; 
        const profitOrLoss = (assetPrice - purchasePrice) * quantity;
        totalReturn += profitOrLoss;
        
        cashBalanceElement.textContent = cashBalance.toFixed(2);
        assetsOwnedElement.textContent = assetsOwned;
        returnElement.textContent = `Total Return: ₹${totalReturn.toFixed(2)}`;
    } else {
        alert("You don't own enough assets to sell.");
    }
    updateMarket();
});

setInterval(updateMarket, 5000);
