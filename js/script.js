/*
    Description: Runs jQuery code when DOM is safe to manipulate, contains bulk of
    - JQuery Validation Code
    - Jquery Slider & Tab Code
*/
$().ready(function () {
    // Form validation
    $("#signupForm").validate({
        /*
            value: sets inital value
            min: sets minimum value on the slider
            max: sets maxium value on the slider
            slide(): changes the value of the label with id #min_col
        */
        rules: {
            min_col: {
                required: true,
                number: true,
                min: -50,
                max: 50,
            },
            max_col: {
                required: true,
                number: true,
                min: -50,
                max: 50,
            },
            min_row: {
                required: true,
                number: true,
                min: -50,
                max: 50,
            },
            max_row: {
                required: true,
                number: true,
                min: -50,
                max: 50,
            }
        },
        // Messages
        messages: {
            min_col: {
                required: " Please enter a value for minimum columns",
                number: " Only numbers are accepted!",
                min: " Please enter a number (-50 <= 0 <= 50)",
            },
            max_col: {
                required: " Please enter a value for maximum columns",
                number: " Only numbers are accepted!",
                min: " Please enter a number (-50 <= 0 <= 50)",
            },
            min_row: {
                required: " Please enter a value for minimum rows",
                number: " Only numbers are accepted!",
                min: " Please enter a number (-50 <= 0 <= 50)",
            },
            max_row: {
                required: " Please enter a value for maximum rows",
                number: " Only numbers are accepted!",
                min: " Please enter a number (-50 <= 0 <= 50)",
            }
        }
    });

    // If form is filled out correctly the table will be generated
    $('#signupForm').submit(function (event) {
        event.preventDefault();
        if ($('#signupForm').valid()) {
            generateTable();
        }
    });
});


/*
    @Params 
    min_count: minimum number of rows or cols
    max_count: maxmimum number of rows or cols
    Description: Sets array so that first value is 0 (unless min is 0)
*/
function setArray(min_count, max_count) {
    let arr = [];

    if (min_count != 0) {
        arr.push(0);
    }

    for (let i = min_count; i <= max_count; i++) {
        arr.push(i);
    }

    return arr;
}


/* 
    Description: Starter function which generates the table
*/
function generateTable() {
    // Checks to see if table already exists, if it does remove it via DOM
    if (document.querySelector("table")) {
        document.querySelector("table").remove();
    }

    // Creation of table element
    const table = document.createElement('table');

    // Stores input value's into variables
    const min_col_count = Number(document.getElementById("min_col").value);
    const max_col_count = Number(document.getElementById("max_col").value);
    const min_row_count = Number(document.getElementById("min_row").value);
    const max_row_count = Number(document.getElementById("max_row").value);

    // Initializes col and row arrays
    const col_arr = setArray(min_col_count, max_col_count);
    const row_arr = setArray(min_row_count, max_row_count);

    for (let i = 0; i < row_arr.length; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < col_arr.length; j++) {
            const col = document.createElement('td');

            // Multplying i x j 
            let val = row_arr[i] * col_arr[j];

            // Gives styling to first row and columns
            if (i === 0 || j === 0) {
                val = row_arr[i] || col_arr[j];
                col.classList.add('header');
            }

            // If first cell, set value to empty char, else set to val
            if (i === 0 && j === 0) val = '';

            // Make the td's innerHTML value equal to value
            col.innerHTML = val;
            row.appendChild(col);
        }
        // Add the row to the HTML
        table.appendChild(row);
    }
    // Adds table to table-container div which houses scroll properties
    const container = document.getElementById("table-container");
    container.appendChild(table);
    // Prevents reload on submit
    event.preventDefault();
}