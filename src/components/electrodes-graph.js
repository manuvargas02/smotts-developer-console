/**
 * Class representing an electrode signal graph.
 */
class ElectrodeGraph {
    /**
     * Creates an instance of ElectrodeGraph.
     * @param {string} htmlElement - The ID of the canvas element.
     * @param {number} maxPoints - Maximum number of data points to display.
     * @param {number} yMin - Minimum Y-axis value.
     * @param {number} yMax - Maximum Y-axis value.
     * @param {Object} [params={}] - Optional parameters for graph customization.
     * @param {number} [params.width=900] - Width of the canvas.
     * @param {number} [params.height=400] - Height of the canvas.
     * @param {number} [params.borderRadius=8] - Border radius of the canvas.
     * @param {string} [params.bgColor='#F5F5F5'] - Background color of the graph.
     * @param {string} [params.lineColor='#E63946'] - Color of the main signal line.
     * @param {string} [params.xLegend="samples"] - Label for the X-axis.
     * @param {string} [params.yLegend="mV"] - Label for the Y-axis.
     * @param {number} [params.lineWidth=2] - Width of the main signal line.
     */
    constructor(htmlElement, maxPoints, yMin, yMax, params = {}) {
        this.canvas = document.getElementById(htmlElement);
        this.maxPoints = maxPoints;
        this.yMin = yMin;
        this.yMax = yMax;
    
        this.width = params.width ?? 900;
        this.height = params.height ?? 400;
        this.borderRadius = params.borderRadius ?? 4;
        this.bgColor = params.bgColor ?? Constants.secondaryColor;
        this.lineColor = params.lineColor ?? Constants.errorColor;
        this.xLegend = params.xLegend ?? "samples";
        this.yLegend = params.yLegend ?? "uV";
        this.lineWidth = params.lineWidth ?? 2;
    
        this.xValue = 0;

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
                        title: { display: false, text: this.xLegend, color: "#333", font: { size: 14, weight: "bold" } },
                        grid: { display: false },
                        ticks: {
                            display: false,
                        }
                        
                    },
                    y: {
                        min: this.yMin,
                        max: this.yMax,
                        title: { display: true, text: this.yLegend, color: "#333", font: { size: 14, weight: "bold" } },
                        grid: { display: false},
                        ticks: { display: false }
                    }
                }
            }
        });
    }

    /**
     * Adds a single point to the graph. If the maximum number of points is reached, the oldest point is replaced.
     * @param {number} yValue - The Y-axis value to add.
     */
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

    /**
     * Adds multiple points to the graph.
     * @param {number[]} yValues - Array of Y-axis values to add.
     */
    addPoints(yValues) {
        yValues.forEach(yValue => {
            this.addPoint(yValue);
        });
    }

    /**
     * Updates the vertical line that represents the current position in the graph.
     * @private
     */
    _updateVerticalLine() {
        this.chart.data.datasets[1].data = [
            { x: this.xValue, y: this.yMin },
            { x: this.xValue, y: this.yMax }
        ];
        this.chart.update();
    }

    /**
     * Clears the graph, resetting all data.
     */
    clear() {
        this.chart.data.labels = Array.from({ length: this.maxPoints }, (_, i) => i);
        this.chart.data.datasets[0].data = new Array(this.maxPoints).fill(null);
        this.chart.data.datasets[1].data = [null, null];
        this.xValue = 0;
        this.chart.update();
    }
}
