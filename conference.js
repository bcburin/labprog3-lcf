

function exportToCsv(filename, data) {
    // Convert data to CSV format
    const csv = Papa.unparse(data);
  
    // Create a link to download the CSV file
    const link = document.createElement("a");
    link.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
    link.download = filename;
  
    // Click the link to start the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

$(document).ready(function() {
    var participants = $('.participant');
  
    // Add click event listener to each participant card
    participants.click(function() { $(this).toggleClass('selected'); });
  
    // Get form input elements
    var dayInput = $('#date');
    var timeInput = $('#time');
    var locationInput = $('#location');
  
    // Add change event listener to form input elements
    dayInput.change(function() {
      var newDay = dayInput.val();
      $('.event-day').text(newDay);
    });

    timeInput.change(function() {
        var newTime = dayInput.val();
        $('.event-time').text(newTime);
    });
  
    locationInput.change(function() {
      var newLocation = locationInput.val();
      $('.event-location').text(newLocation);
    });

    // Listen for changes on the course select element
    $('#course').on('change', function() {
        var selectedCourse = $(this).val();
    
        // Loop through each participant card
        $('.participant').each(function() {
        var course = $(this).find('.course').text(); // Get the text of the course element in the card
        if (course === selectedCourse || selectedCourse === 'All') {
            $(this).removeClass('hidden'); // Show the card if it matches the selected course or 'All'
        } else {
            $(this).addClass('hidden'); // Hide the card if it doesn't match the selected course
        }
        });
    });


    // Handle export CSV
    $("#export-csv").on("click", function () {
        const participants = $(".participant");
        const data = [];
      
        // Add headers to the CSV
        data.push(["Status", "Course", "Name", "Rank"]);
      
        // Collect data from each participant and add it to the CSV
        participants.each(function () {
          const name = $(this).find(".name").text();
          const rank = $(this).find(".rank").text();
          const course = $(this).find(".course").text();
          const status = $(this).hasClass("selected") ? "Present" : "Absent";
      
          data.push([status, course, name, rank]);
        });
      
        // Sort the data by status, course, and name
        data.sort(function (a, b) {
          if (a[0] === b[0]) {
            if (a[1] === b[1]) {
              return a[2].localeCompare(b[2]);
            }
            return a[1].localeCompare(b[1]);
          }
          return a[0] < b[0] ? 1 : -1;
        });
      
        // Export the data to a CSV file
        exportToCsv("participants.csv", data);
      });
      
  });
  