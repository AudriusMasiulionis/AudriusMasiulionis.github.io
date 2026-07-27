document.addEventListener('DOMContentLoaded', function () {
  var form = document.querySelector('.contact-form');
  var status = document.querySelector('.form-status');
  if (!form || !status) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    })
      .then(function (res) {
        if (res.ok) {
          form.reset();
          form.hidden = true;
          status.className = 'form-status ok';
          status.textContent = "Thanks — your message is on its way. I'll get back to you soon.";
        } else {
          status.className = 'form-status err';
          status.textContent = 'Something went wrong. Please try again, or reach me on LinkedIn.';
        }
        status.hidden = false;
      })
      .catch(function () {
        status.className = 'form-status err';
        status.textContent = 'Network error. Please try again, or reach me on LinkedIn.';
        status.hidden = false;
      })
      .finally(function () {
        btn.disabled = false;
      });
  });
});
