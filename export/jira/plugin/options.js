// Saves options to chrome.storage
function save_options() {
  var userKey = document.getElementById('userKey').value;
  var options = { userKey: userKey };
  
  chrome.storage.sync.set(options, function () {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved!';
    setTimeout(function () {
      status.textContent = '';
    }, 1500);
  });
}


// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    userKey: 'notSet'
  },
    function (items) {    
        document.getElementById('userKey').value = items.userKey;
    });
}


document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);

//for test puropses
if (!chrome.storage) {
  chrome.storage = {
    sync: {
      get: function (item, fn) { fn(item); },
      set: function (item, fn) { fn(item); },
    }
  }
}