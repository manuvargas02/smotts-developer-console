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

        // Aplicar estilos al canvas
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.borderRadius = `${this.border_radius}px`;
        this.canvas.style.backgroundColor = this.bg_color;
        this.canvas.style.boxShadow = "0px 4px 8px rgba(0,0,0,0.1)";

        this.chart = new Chart(this.canvas, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: "",  // Se deja vacío para que no aparezca en la leyenda
                    data: [],
                    backgroundColor: "transparent",
                    borderColor: this.line_color,
                    borderWidth: this.line_width,
                    tension: 0.2,  // Hace que las líneas sean más suaves
                    pointRadius: 0  // Oculta los puntos individuales
                }]
            },
            options: {
                responsive: false,
                animation: false,
                plugins: {
                    legend: {
                        display: false // Ocultar la leyenda
                    },
                    title: {
                        display: false  // Ocultar título general
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: this.x_legend,
                            color: "#333",
                            font: {
                                size: 14
                            }
                        },
                        grid: {
                            color: "rgba(0, 0, 0, 0.1)"
                        }
                    },
                    y: {
                        min: this.y_min,
                        max: this.y_max,
                        title: {
                            display: true,
                            text: this.y_legend,
                            color: "#333",
                            font: {
                                size: 14
                            }
                        },
                        grid: {
                            color: "rgba(0, 0, 0, 0.1)"
                        }
                    }
                }
            }
        });

        this.addPoint = (y_value) => {
            if (this.chart.data.datasets[0].data.length < this.max_points) {
                this.chart.data.labels.push(this.x_value);
                this.chart.data.datasets[0].data.push(y_value);
            } else {
                let index = this.x_value % this.max_points;
                this.chart.data.datasets[0].data[index] = y_value;
            }
            this.x_value++;
            this.chart.update();
        };

        this.addPoints = (y_values) => {
            y_values.forEach(y_value => {
                if (this.chart.data.datasets[0].data.length < this.max_points) {
                    this.chart.data.labels.push(this.x_value);
                    this.chart.data.datasets[0].data.push(y_value);
                } else {
                    let index = this.x_value % this.max_points;
                    this.chart.data.datasets[0].data[index] = y_value;
                }
                this.x_value++;
                this.chart.update();
            });       
            
        };
    }
}
