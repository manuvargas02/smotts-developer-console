class ElectrodeGraph {
    constructor(html_element, max_points, y_min, y_max, width = 700, height = 400, border_radius = 8, bg_color = '#F5F5F5', line_color = '#E63946', x_legend = "t (ms)", y_legend = "mV", line_width = 2) {
        this.canvas = document.getElementById(html_element);
        this.bg_color = bg_color;
        this.border_radius = border_radius;
        this.line_color = line_color;
        this.x_legend = x_legend;
        this.y_legend = y_legend;
        this.line_width = line_width;
        this.max_points = max_points;
        this.y_min = y_min;
        this.y_max = y_max;
        this.width = width;
        this.height = height;
        this.x_value = 0;

        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.borderRadius = `${this.border_radius}px`;

        this.chart = new Chart(this.canvas, {
            type: 'line',
            data: {
                labels: Array.from({ length: this.max_points }, (_, i) => i),
                datasets: [
                    {
                        label: "Señal EEG",
                        data: new Array(this.max_points).fill(null),
                        borderColor: this.line_color,
                        borderWidth: this.line_width,
                        tension: 0.6,
                        pointRadius: 0,
                        fill: false
                    },
                ]
            },
            options: {
                responsive: false,
                animation: false,
                plugins: {
                    legend: { display: false },
                    title: { display: false }
                },
                scales: {
                    x: {
                        title: { display: true, text: this.x_legend, color: "#333", font: { size: 14 } },
                        grid: { color: "rgba(0, 0, 0, 0.1)" }
                    },
                    y: {
                        min: this.y_min,
                        max: this.y_max,
                        title: { display: true, text: this.y_legend, color: "#333", font: { size: 14 } },
                        grid: { color: "rgba(0, 0, 0, 0.1)" }
                    }
                }
            }
        });

        this.addPoint = (y_value) => {
            if (this.chart.data.datasets[0].data.length < this.max_points) {
                this.chart.data.datasets[0].data.push(y_value);
                this.chart.data.labels.push(this.x_value);
            } else {
                this.chart.data.datasets[0].data.shift();
                this.chart.data.datasets[0].data.push(y_value);
                this.chart.data.labels.shift();
                this.chart.data.labels.push(this.x_value);
            }

            this.x_value++;
            this.chart.update();
        };

        this.addPoints = (y_values) => {
            y_values.forEach(y_value => {
                this.addPoint(y_value);
            });
        };
        
    }
}
