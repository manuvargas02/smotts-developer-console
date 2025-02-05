class ElectrodeGraph {
    constructor(htmlElement, maxPoints, yMin, yMax, width = 900, height = 400, borderRadius = 8, bgColor = '#F5F5F5', lineColor = '#E63946', xLegend = "samples", yLegend = "mV", lineWidth = 2, xTicks = 5) {
        this.canvas = document.getElementById(htmlElement);
        this.bgColor = bgColor;
        this.borderRadius = borderRadius;
        this.lineColor = lineColor;
        this.xLegend = xLegend;
        this.yLegend = yLegend;
        this.lineWidth = lineWidth;
        this.maxPoints = maxPoints;
        this.yMin = yMin;
        this.yMax = yMax;
        this.width = width;
        this.height = height;
        this.xValue = 0;
        this.xTicks = xTicks;

        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.borderRadius = `${this.borderRadius}px`;
        this.canvas.style.backgroundColor = this.bgColor;

        this.chart = new Chart(this.canvas, {
            type: 'line',
            data: {
                labels: Array.from({ length: this.maxPoints }, (_, i) => i),
                datasets: [
                    {
                        data: new Array(this.maxPoints).fill(null),
                        borderColor: this.lineColor,
                        borderWidth: this.lineWidth,
                        tension: 0.6,
                        pointRadius: 0,
                        fill: false
                    },
                    {
                        data: [null, null],
                        borderColor: "#000",
                        borderWidth: 2,
                        pointRadius: 0,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: false,
                animation: false,
                plugins: {
                    legend: { display: false },
                },
                scales: {
                    x: {
                        title: { display: true, text: this.xLegend, color: "#333", font: { size: 14 } },
                        grid: { display: false },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        min: this.yMin,
                        max: this.yMax,
                        title: { display: true, text: this.yLegend, color: "#333", font: { size: 14 } },
                        grid: { color: "rgba(0, 0, 0, 0.1)" },
                        ticks: { 
                            display: false, 
                        }
                    }
                }
            }
        });
    }

    addPoint(yValue) {
        if (this.chart.data.datasets[0].data.length < this.maxPoints) {
            this.chart.data.labels.push(this.xValue);
            this.chart.data.datasets[0].data.push(yValue);
        } else {
            let index = this.xValue % this.maxPoints;
            this.chart.data.datasets[0].data[index] = yValue;
            this.chart.data.labels[index] = this.xValue;
        }
        this._updateVerticalLine();
        this.chart.update(); 
        this.xValue++;
    }

    addPoints(yValues) {
        yValues.forEach(yValue => {
            this.addPoint(yValue); 
        });
    }
    
    _updateVerticalLine() {
        this.chart.data.datasets[1].data = [
            { x: this.xValue, y: this.yMin },
            { x: this.xValue, y: this.yMax }
        ];
        this.chart.update();
    }

    clear() {
        this.chart.data.labels = Array.from({ length: this.maxPoints }, (_, i) => i);
        this.chart.data.datasets[0].data = new Array(this.maxPoints).fill(null);
        this.chart.data.datasets[1].data = [null, null]; 
        this.xValue = 0;  
        this.chart.update();
        console.log("Graph cleared!");
    }
}