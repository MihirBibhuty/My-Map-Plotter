
// Map Code (Ploting Lat and Lng values in a Google Map)

function initMap() {

    // Map options
    var options = {
        zoom: 4,
        center: { lat: 28.7041, lng: 77.1025 }
    }

    // Making ner map
    var map = new google.maps.Map(document.getElementById('map'), options);





    // Converting SpreadSheet Values into a JSON

    var input = document.getElementById('input');
    input.addEventListener('change', function () {
        readXlsxFile(input.files[0]).then(function (data) {
            console.log(data);

            markerFunc(data);   // Calling markerFunc function and giving it data values as parameter
        });
    });





    // Putting the JSON values into an Array(markers array) via a function

    function markerFunc(data) {

        var markers = [];   // Making an empty array


        // Filling values into the Array by looping
        for (let i = 1; i < data.length; i++) {

            markers[i - 1] = {
                coords: { lat: parseFloat(data[i][1]), lng: parseFloat(data[i][0]) },
                content: data[i][2]
            };
        }



        console.log(markers);   // Checking if the JSON/SpreadSheet values are properly put into the 'markers' Array



        // Loop through markers
        for (var i = 0; i < markers.length; i++) {

            // Add marker
            addMarker(markers[i]);
        }


        // Creating addMarker Function
        function addMarker(props) {

            // Add marker
            var marker = new google.maps.Marker({
                position: props.coords,
                map: map,
            });

            // Info window
            var infoWindow = new google.maps.InfoWindow({
                content: props.content
            });

            // Info window event listner
            marker.addListener('click', function () {
                infoWindow.open(map, marker);
            });
        }

    }


}










// Table Code (Displaying the Spreadsheet values in the Browser)

var input = document.getElementById('input');
input.addEventListener('change', function () {
    readXlsxFile(input.files[0]).then(function (data) {

        var i = 0;
        data.map((row, index) => {

            if (i == 0) {
                let table = document.getElementById('tblData');
                generateTableHead(table, row);
            }

            if (i > 0) {
                let table = document.getElementById('tblData');
                generateTableRows(table, row);
            }

            i++;

        });

        noOfRows(data);

    });
});



function generateTableHead(table, data) {

    let thead = table.createTHead();
    let row = thead.insertRow();

    for (let key of data) {

        let th = document.createElement('th');
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}


function generateTableRows(table, data) {

    let newRow = table.insertRow(-1);

    data.map((row, index) => {

        let newCell = newRow.insertCell();
        let newText = document.createTextNode(row);
        newCell.appendChild(newText);
    });
}


function noOfRows(data) {

    let textNode = document.createTextNode(`Total number of values given --> ${data.length - 1}`);
    document.getElementById('tblData').appendChild(textNode);
}




