import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ products }) => {
    const labels = products.map((product) => product.titleproducts);

    const totalStoreRevenue = products.reduce((acc, product) => {
        return (
            acc +
            (product.colors[0]
                ? Object.entries(product.colors[0]).reduce((prodAcc, [color, details]) => {
                      const discountedPrice = parseFloat(details.price.discounted.replace(/[\.,]/g, ''));
                      const sold = parseInt(details.sold, 10);
                      const returns = parseInt(details.return, 10);
                      const revenue = discountedPrice * (sold - returns);
                      return prodAcc + revenue;
                  }, 0)
                : 0)
        );
    }, 0);

    const data = {
        labels,
        datasets: [
            {
                label: 'Doanh Thu Từng Sản Phẩm',
                data: products.map((product) => {
                    return product.colors[0]
                        ? Object.entries(product.colors[0]).reduce((prodAcc, [color, details]) => {
                              const discountedPrice = parseFloat(details.price.discounted.replace(/[\.,]/g, ''));
                              const sold = parseInt(details.sold, 10);
                              const returns = parseInt(details.return, 10);
                              const revenue = discountedPrice * (sold - returns);
                              return prodAcc + revenue;
                          }, 0)
                        : 0;
                }),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#C70039'],
                borderColor: 'rgba(255, 255, 255, 0.7)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.raw;
                        return `${label}: ${value.toLocaleString()} (${((value / totalStoreRevenue) * 100).toFixed(2)}%)`;
                    },
                },
            },
        },
    };

    return (
        <div style={{ width: '500px', height: '500px' }}>
            <Pie data={data} options={options} />
        </div>
    );
};

export default PieChart;
