define(['knockout', 'ojs/ojchart'], function (ko) {
    function StatisticsViewModel() {
        var self = this;

        self.chartData = ko.observableArray([]);

        fetch('./js/data/books.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to load books JSON');
                }
                return response.json();
            })
            .then((books) => {
                const categoryCounts = books.reduce((acc, book) => {
                    acc[book.category] = (acc[book.category] || 0) + 1;
                    return acc;
                }, {});

                const chartSeries = Object.keys(categoryCounts).map((category) => ({
                    name: category,
                    items: [categoryCounts[category]],
                }));

                self.chartData(chartSeries);
            })
            .catch((error) => {
                console.error('Error loading or processing books JSON:', error);
            });
    }

    return StatisticsViewModel;
});
