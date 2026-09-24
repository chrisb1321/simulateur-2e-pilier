(function () {
  "use strict";

  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  onReady(function () {
    var roots = document.querySelectorAll(".f2p");
    for (var i = 0; i < roots.length; i++) {
      setup(roots[i]);
    }
  });

  function setup(root) {
    if (root.getAttribute("data-f2p-ready") === "1") {
      return;
    }
    root.setAttribute("data-f2p-ready", "1");

    var form = root.querySelector(".f2p-form");
    if (!form) {
      return;
    }

    var i18n = readMessages(root);
    var banner = root.querySelector(".f2p-banner");
    var prev = root.querySelector(".f2p-btn--prev");
    var next = root.querySelector(".f2p-btn--next");
    var status = root.querySelector(".f2p-status");
    var canvas = root.querySelector(".f2p-canvas");
    var signatureInput = form.querySelector('input[name="signature"]');
    var step = 1;
    var ctx = canvas ? canvas.getContext("2d") : null;
    var drawing = false;
    var hasInk = false;
    var signatureReady = false;
    var lastPoint = null;

    bindMasks(form);
    bindSelects(form);
    bindHelps(root);
    bindPostal(form);
    bindSignature();

    if (prev) {
      prev.addEventListener("click", function () {
        if (step > 1) {
          showStep(step - 1, true);
          hideBanner();
        }
      });
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (step < 4) {
        var result = validateStep(step);
        if (!result.ok) {
          showBanner(i18n.banner);
          focusControl(result.first);
          return;
        }
        showStep(step + 1, true);
        hideBanner();
        return;
      }
      submitForm();
    });

    function readMessages(scope) {
      var node = scope.querySelector(".f2p-i18n");
      if (!node) {
        return { banner: "Attention : Certains champs sont manquants ou comportent des erreurs." };
      }
      try {
        return JSON.parse(node.textContent);
      } catch (error) {
        return { banner: "Attention : Certains champs sont manquants ou comportent des erreurs." };
      }
    }

    function msg(key) {
      var fallback = {
        banner: "Attention : Certains champs sont manquants ou comportent des erreurs.",
        civilite: "Indiquez votre civilité.",
        nom: "Indiquez votre nom.",
        prenom: "Indiquez votre prénom.",
        email: "Indiquez une adresse e-mail valide.",
        adresse: "Indiquez le nom de votre rue.",
        numero: "Indiquez le numéro.",
        postal_ch: "Le code postal suisse doit comporter 4 chiffres.",
        postal: "Indiquez le code postal.",
        ville: "Indiquez la ville.",
        pays: "Indiquez le pays.",
        nationalite: "Indiquez la nationalité.",
        telephone: "Indiquez un numéro de mobile suisse valide (07x xxx xx xx ou +41 7x xxx xx xx).",
        etat_civil: "Indiquez votre état civil.",
        avs: "Indiquez votre numéro AVS.",
        avs_invalid: "Le numéro AVS est invalide. Il doit commencer par 756 et avoir une clé de contrôle correcte (format 756.xxxx.xxxx.xx).",
        date: "Indiquez une date de naissance valide (jj/mm/aaaa).",
        date_invalid: "Cette date de naissance n’est pas acceptée.",
        caisse: "Le nom de la caisse de pension est trop long.",
        emploi: "Indiquez si vous avez un emploi en Suisse.",
        signature: "La signature est obligatoire.",
        consent: "Cochez la case pour confirmer l’exactitude des informations.",
        mail: "L’envoi a échoué. Veuillez réessayer dans un instant."
      };
      return i18n[key] || fallback[key] || "";
    }

    function showBanner(text) {
      if (!banner) {
        return;
      }
      banner.textContent = text || msg("banner");
      banner.hidden = false;
      var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      root.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }

    function hideBanner() {
      if (banner) {
        banner.hidden = true;
      }
    }

    function showStep(number, moveFocus) {
      step = number;
      var panels = root.querySelectorAll(".f2p-step");
      for (var i = 0; i < panels.length; i++) {
        var panel = panels[i];
        panel.hidden = parseInt(panel.getAttribute("data-step"), 10) !== number;
      }
      var dots = root.querySelectorAll(".f2p-dot");
      for (var d = 0; d < dots.length; d++) {
        var n = d + 1;
        dots[d].classList.toggle("is-current", n === number);
        dots[d].classList.toggle("is-done", n < number);
        if (n === number) {
          dots[d].setAttribute("aria-current", "step");
        } else {
          dots[d].removeAttribute("aria-current");
        }
      }
      if (prev) {
        prev.hidden = number === 1;
      }
      if (next) {
        next.textContent = number === 4 ? root.getAttribute("data-label-submit") || "Envoyer" : root.getAttribute("data-label-next") || "Suivant";
      }
      if (status) {
        status.textContent = "Étape " + number + " sur 4";
      }
      if (number === 4) {
        window.requestAnimationFrame(function () {
          prepareCanvas(false);
        });
      }
      if (moveFocus) {
        var target = root.querySelector('.f2p-step[data-step="' + number + '"] [data-initial-focus]');
        if (target) {
          target.focus();
        }
      }
    }

    function clearErrors(scope) {
      var fields = (scope || form).querySelectorAll(".f2p-field");
      for (var i = 0; i < fields.length; i++) {
        fields[i].classList.remove("is-invalid");
        var error = fields[i].querySelector(".f2p-field-error");
        if (error) {
          error.textContent = "";
        }
        var controls = fields[i].querySelectorAll("input, select, textarea, canvas");
        for (var c = 0; c < controls.length; c++) {
          controls[c].removeAttribute("aria-invalid");
        }
      }
    }

    function mark(name, message) {
      var field = form.querySelector('[data-field="' + name + '"]');
      if (!field) {
        return null;
      }
      field.classList.add("is-invalid");
      var error = field.querySelector(".f2p-field-error");
      if (error) {
        error.textContent = message;
      }
      var control = field.querySelector("input:not([type='hidden']), select, textarea, canvas");
      if (control) {
        control.setAttribute("aria-invalid", "true");
        if (error && error.id) {
          var described = control.getAttribute("aria-describedby") || "";
          if (described.indexOf(error.id) === -1) {
            control.setAttribute("aria-describedby", (described + " " + error.id).trim());
          }
        }
      }
      return control;
    }

    function focusControl(control) {
      if (control && typeof control.focus === "function") {
        control.focus();
      }
    }

    function fieldValue(name) {
      var node = form.querySelector('[name="' + name + '"]');
      if (!node) {
        return "";
      }
      if (node.type === "radio") {
        var checked = form.querySelector('[name="' + name + '"]:checked');
        return checked ? checked.value : "";
      }
      if (node.type === "checkbox") {
        return node.checked ? node.value : "";
      }
      return String(node.value || "").trim();
    }

    function validateStep(number) {
      var panel = root.querySelector('.f2p-step[data-step="' + number + '"]');
      clearErrors(panel);
      var errors = [];

      if (number === 1) {
        if (fieldValue("civilite") !== "Monsieur" && fieldValue("civilite") !== "Madame") {
          errors.push(["civilite", msg("civilite")]);
        }
        if (!nameValid(fieldValue("nom"))) {
          errors.push(["nom", msg("nom")]);
        }
        if (!nameValid(fieldValue("prenom"))) {
          errors.push(["prenom", msg("prenom")]);
        }
        if (!emailValid(fieldValue("email"))) {
          errors.push(["email", msg("email")]);
        }
      }

      if (number === 2) {
        if (!streetValid(fieldValue("adresse"))) {
          errors.push(["adresse", msg("adresse")]);
        }
        if (!numberValid(fieldValue("numero"))) {
          errors.push(["numero", msg("numero")]);
        }
        var pays = fieldValue("pays");
        if (!postalValid(fieldValue("code_postal"), pays)) {
          errors.push(["code_postal", pays === "Suisse" ? msg("postal_ch") : msg("postal")]);
        }
        if (!cityValid(fieldValue("ville"))) {
          errors.push(["ville", msg("ville")]);
        }
        if (!pays) {
          errors.push(["pays", msg("pays")]);
        }
        if (!fieldValue("nationalite")) {
          errors.push(["nationalite", msg("nationalite")]);
        }
        if (!canonicalPhone(fieldValue("telephone"), fieldValue("indicatif") || "+41")) {
          errors.push(["telephone", msg("telephone")]);
        }
      }

      if (number === 3) {
        if (!fieldValue("etat_civil")) {
          errors.push(["etat_civil", msg("etat_civil")]);
        }
        var avs = fieldValue("avs");
        if (!avsDigits(avs)) {
          errors.push(["avs", msg("avs")]);
        } else if (!avsValid(avs)) {
          errors.push(["avs", msg("avs_invalid")]);
        }
        var dateKey = dateError(fieldValue("date_naissance"));
        if (dateKey) {
          errors.push(["date_naissance", msg(dateKey)]);
        }
        if (fieldValue("caisse").length > 120) {
          errors.push(["caisse", msg("caisse")]);
        }
        if (!fieldValue("emploi")) {
          errors.push(["emploi", msg("emploi")]);
        }
      }

      if (number === 4) {
        if (!hasInk) {
          errors.push(["signature", msg("signature")]);
        }
        if (fieldValue("consentement") !== "1") {
          errors.push(["consentement", msg("consent")]);
        }
      }

      var first = null;
      for (var i = 0; i < errors.length; i++) {
        var control = mark(errors[i][0], errors[i][1]);
        if (!first) {
          first = control;
        }
      }
      return { ok: errors.length === 0, first: first, fields: errors };
    }

    function submitForm() {
      var firstBad = 0;
      var firstControl = null;
      for (var s = 1; s <= 4; s++) {
        var result = validateStep(s);
        if (!result.ok && !firstBad) {
          firstBad = s;
          firstControl = result.first;
        }
      }
      if (firstBad) {
        showStep(firstBad, false);
        showBanner(msg("banner"));
        focusControl(firstControl);
        return;
      }

      if (signatureInput && canvas) {
        signatureInput.value = canvas.toDataURL("image/png");
      }

      var body = new FormData(form);
      body.append("action", "f2p_submit");
      if (next) {
        next.disabled = true;
        next.textContent = root.getAttribute("data-label-sending") || "Envoi…";
      }

      var url = form.getAttribute("data-ajax") || "";
      window.fetch(url, {
        method: "POST",
        body: body,
        credentials: "same-origin"
      }).then(function (response) {
        return response.json().catch(function () {
          return { success: false, data: { message: msg("mail") } };
        });
      }).then(function (payload) {
        if (payload && payload.success) {
          showSuccess();
          return;
        }
        var data = (payload && payload.data) || {};
        restoreNext();
        if (data.fields) {
          applyServerFields(data.fields);
          showBanner(msg("banner"));
          return;
        }
        showBanner(data.message || msg("mail"));
      }).catch(function () {
        restoreNext();
        showBanner(msg("mail"));
      });
    }

    function restoreNext() {
      if (!next) {
        return;
      }
      next.disabled = false;
      next.textContent = root.getAttribute("data-label-submit") || "Envoyer";
    }

    function applyServerFields(fields) {
      var stepOf = {
        civilite: 1,
        nom: 1,
        prenom: 1,
        email: 1,
        adresse: 2,
        numero: 2,
        code_postal: 2,
        ville: 2,
        pays: 2,
        nationalite: 2,
        telephone: 2,
        etat_civil: 3,
        avs: 3,
        date_naissance: 3,
        caisse: 3,
        emploi: 3,
        signature: 4,
        consentement: 4
      };
      var firstStep = 4;
      var first = null;
      clearErrors(form);
      Object.keys(fields).forEach(function (name) {
        var control = mark(name, fields[name]);
        var owner = stepOf[name] || 1;
        if (owner < firstStep) {
          firstStep = owner;
          first = control;
        }
      });
      showStep(firstStep, false);
      focusControl(first);
    }

    function showSuccess() {
      var steps = root.querySelector(".f2p-steps");
      var actions = root.querySelector(".f2p-actions");
      var success = root.querySelector(".f2p-success");
      var kicker = root.querySelector(".f2p-kicker");
      var progress = root.querySelector(".f2p-progress");
      if (kicker) {
        kicker.hidden = true;
      }
      if (progress) {
        progress.hidden = true;
      }
      if (steps) {
        steps.hidden = true;
      }
      if (actions) {
        actions.hidden = true;
      }
      if (success) {
        success.hidden = false;
      }
      hideBanner();
      if (status) {
        status.textContent = "Demande envoyée";
      }
    }

    function bindMasks(scope) {
      var avs = scope.querySelector('[name="avs"]');
      var date = scope.querySelector('[name="date_naissance"]');
      if (avs) {
        avs.addEventListener("input", function () {
          var formatted = maskAvs(avs.value);
          if (formatted !== avs.value) {
            avs.value = formatted;
          }
        });
      }
      if (date) {
        date.addEventListener("input", function () {
          var formatted = maskDate(date.value);
          if (formatted !== date.value) {
            date.value = formatted;
          }
        });
      }
    }

    function bindSelects(scope) {
      var selects = scope.querySelectorAll(".f2p-select");
      for (var i = 0; i < selects.length; i++) {
        selects[i].addEventListener("change", function (event) {
          event.target.classList.toggle("is-placeholder", event.target.value === "");
        });
      }
    }

    function bindPostal(scope) {
      var pays = scope.querySelector('[name="pays"]');
      var postal = scope.querySelector('[name="code_postal"]');
      if (!pays || !postal) {
        return;
      }
      var sync = function () {
        var swiss = pays.value === "Suisse";
        postal.maxLength = swiss ? 4 : 12;
        postal.setAttribute("inputmode", swiss ? "numeric" : "text");
      };
      pays.addEventListener("change", sync);
      sync();
    }

    function bindHelps(scope) {
      var toggles = scope.querySelectorAll("[data-f2p-toggle]");
      for (var i = 0; i < toggles.length; i++) {
        toggles[i].addEventListener("click", function (event) {
          var button = event.currentTarget;
          var panel = document.getElementById(button.getAttribute("data-f2p-toggle"));
          if (!panel) {
            return;
          }
          var open = panel.hidden;
          panel.hidden = !open;
          button.setAttribute("aria-expanded", open ? "true" : "false");
          if (open) {
            panel.tabIndex = -1;
            panel.focus();
          }
        });
      }
      var focuses = scope.querySelectorAll("[data-f2p-focus]");
      for (var f = 0; f < focuses.length; f++) {
        focuses[f].addEventListener("click", function (event) {
          var note = document.getElementById(event.currentTarget.getAttribute("data-f2p-focus"));
          if (note && note.focus) {
            note.focus();
          }
        });
      }
    }

    function bindSignature() {
      if (!canvas || !ctx) {
        return;
      }
      var clear = root.querySelector("[data-f2p-clear]");
      if (clear) {
        clear.addEventListener("click", function () {
          prepareCanvas(true);
          if (signatureInput) {
            signatureInput.value = "";
          }
        });
      }

      canvas.addEventListener("pointerdown", function (event) {
        if (event.pointerType === "mouse" && event.button !== 0) {
          return;
        }
        prepareCanvas(false);
        drawing = true;
        try {
          canvas.setPointerCapture(event.pointerId);
        } catch (error) {
          /* Le navigateur peut refuser la capture. */
        }
        lastPoint = point(event);
      });

      canvas.addEventListener("pointermove", function (event) {
        if (!drawing || !lastPoint) {
          return;
        }
        var nextPoint = point(event);
        ctx.beginPath();
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(nextPoint.x, nextPoint.y);
        ctx.stroke();
        if (Math.abs(nextPoint.x - lastPoint.x) + Math.abs(nextPoint.y - lastPoint.y) > 0.4) {
          hasInk = true;
        }
        lastPoint = nextPoint;
      });

      function endDraw() {
        drawing = false;
        lastPoint = null;
      }
      canvas.addEventListener("pointerup", endDraw);
      canvas.addEventListener("pointercancel", endDraw);

      window.addEventListener("resize", function () {
        if (!hasInk) {
          signatureReady = false;
          if (step === 4) {
            prepareCanvas(false);
          }
        }
      });
    }

    function prepareCanvas(force) {
      if (!canvas || !ctx) {
        return;
      }
      var rect = canvas.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) {
        return;
      }
      if (signatureReady && !force) {
        return;
      }
      var ratio = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.round(rect.width * ratio));
      canvas.height = Math.max(1, Math.round(rect.height * ratio));
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, rect.width, rect.height);
      ctx.strokeStyle = "#11191d";
      ctx.lineWidth = 2.2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      signatureReady = true;
      hasInk = false;
    }

    function point(event) {
      var rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    }
  }

  function maskAvs(value) {
    var digits = String(value || "").replace(/\D/g, "").slice(0, 13);
    var out = digits.slice(0, 3);
    if (digits.length > 3) {
      out += "." + digits.slice(3, 7);
    }
    if (digits.length > 7) {
      out += "." + digits.slice(7, 11);
    }
    if (digits.length > 11) {
      out += "." + digits.slice(11, 13);
    }
    return out;
  }

  function maskDate(value) {
    var digits = String(value || "").replace(/\D/g, "").slice(0, 8);
    var out = digits.slice(0, 2);
    if (digits.length > 2) {
      out += "/" + digits.slice(2, 4);
    }
    if (digits.length > 4) {
      out += "/" + digits.slice(4);
    }
    return out;
  }

  function avsDigits(value) {
    return String(value || "").replace(/\D+/g, "");
  }

  function avsValid(value) {
    var digits = avsDigits(value);
    if (digits.length !== 13 || digits.slice(0, 3) !== "756") {
      return false;
    }
    var sum = 0;
    for (var i = 0; i < 12; i++) {
      var n = parseInt(digits.charAt(i), 10);
      sum += i % 2 === 0 ? n : n * 3;
    }
    var check = (10 - (sum % 10)) % 10;
    return check === parseInt(digits.charAt(12), 10);
  }

  function canonicalPhone(telephone, indicatif) {
    var compact = String(telephone || "").trim().replace(/[\s.\-\/()]/g, "");
    if (!compact) {
      return "";
    }
    if (compact.indexOf("00") === 0) {
      compact = "+" + compact.slice(2);
    }
    if (compact.charAt(0) !== "+") {
      var prefix = String(indicatif || "+41").replace(/\s+/g, "");
      if (!prefix) {
        prefix = "+41";
      }
      if (compact.charAt(0) === "0") {
        compact = "+41" + compact.slice(1);
      } else {
        compact = prefix + compact;
      }
    }
    if (compact.indexOf("+410") === 0) {
      compact = "+41" + compact.slice(4);
    }
    return /^\+417[0-9]\d{7}$/.test(compact) ? compact : "";
  }

  function nameValid(value) {
    var text = String(value || "").trim();
    if (!text || text.length > 80) {
      return false;
    }
    try {
      return /^[\p{L}][\p{L}\s'’\-]{0,79}$/u.test(text);
    } catch (error) {
      return text.length >= 1;
    }
  }

  function streetValid(value) {
    var text = String(value || "").trim();
    if (text.length < 2 || text.length > 120) {
      return false;
    }
    try {
      return /^[\p{L}0-9][\p{L}0-9\s'’.,\-]{1,119}$/u.test(text);
    } catch (error) {
      return true;
    }
  }

  function numberValid(value) {
    return /^[0-9][0-9A-Za-z\/\-\s]{0,11}$/.test(String(value || "").trim());
  }

  function cityValid(value) {
    var text = String(value || "").trim();
    if (text.length < 2 || text.length > 80) {
      return false;
    }
    try {
      return /^[\p{L}][\p{L}\s'’.\-]{1,79}$/u.test(text);
    } catch (error) {
      return true;
    }
  }

  function postalValid(value, country) {
    var text = String(value || "").trim();
    if (country === "Suisse") {
      return /^\d{4}$/.test(text);
    }
    return /^[A-Za-z0-9][A-Za-z0-9 \-]{1,11}$/.test(text);
  }

  function emailValid(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
  }

  function dateError(value) {
    var match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(String(value || "").trim());
    if (!match) {
      return "date";
    }
    var day = parseInt(match[1], 10);
    var month = parseInt(match[2], 10);
    var year = parseInt(match[3], 10);
    var born = new Date(year, month - 1, day);
    if (born.getFullYear() !== year || born.getMonth() !== month - 1 || born.getDate() !== day) {
      return "date";
    }
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    if (born > today) {
      return "date_invalid";
    }
    var age = today.getFullYear() - year;
    var monthDelta = today.getMonth() - (month - 1);
    if (monthDelta < 0 || (monthDelta === 0 && today.getDate() < day)) {
      age--;
    }
    if (age < 15 || age > 120) {
      return "date_invalid";
    }
    return "";
  }
})();
