/**
 * Perceelkaart bij de calculator: adreszoeken (Geopunt) + overlays
 * CadGIS Capakey, GRB-percelen, Geoportaal RO (gewestplan / RUP).
 */
(function () {
  "use strict";

  const SUGGEST = "https://geo.api.vlaanderen.be/geolocation/v4/Suggestion";
  const LOCATE = "https://geo.api.vlaanderen.be/geolocation/v4/Location";
  const WMS_GRB = "https://geo.api.vlaanderen.be/GRB/wms";
  const WMS_CAD = "https://geo.api.vlaanderen.be/RVVThemabestand/wms";
  const WMS_OFW = "https://geo.api.vlaanderen.be/OFW/wms";
  const WMS_RO = "https://www.mercator.vlaanderen.be/raadpleegdienstenmercatorpubliek/wms";

  const FL_CENTER = [51.05, 4.35];
  const FL_ZOOM = 9;

  function cfg() {
    return window.REDUCD_MAPS || {};
  }

  function hasGoogleKey() {
    const k = String(cfg().googleMapsApiKey || "").trim();
    return k && k !== "PLACEHOLDER";
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function wms(url, layers, opacity) {
    return L.tileLayer.wms(url, {
      layers: layers,
      format: "image/png",
      transparent: true,
      version: "1.3.0",
      opacity: opacity == null ? 0.75 : opacity,
      attribution: "",
      maxZoom: 21
    });
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function loadCss(href) {
    if (document.querySelector('link[href="' + href + '"]')) return;
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = href;
    document.head.appendChild(l);
  }

  async function ensureLeaflet() {
    if (window.L) return;
    loadCss("https://unpkg.com/leaflet@1.9.4/dist/leaflet.css");
    await loadScript("https://unpkg.com/leaflet@1.9.4/dist/leaflet.js");
  }

  async function ensureGoogle() {
    if (window.google && window.google.maps) return;
    const key = encodeURIComponent(cfg().googleMapsApiKey);
    await loadScript("https://maps.googleapis.com/maps/api/js?key=" + key + "&v=weekly&language=nl");
  }

  /** WMS tile URL for Google Maps ImageMapType (EPSG:3857). */
  function googleWmsTileUrl(base, layers, coord, zoom) {
    const tileSize = 256;
    const n = Math.pow(2, zoom);
    const lonMin = (coord.x / n) * 360 - 180;
    const lonMax = ((coord.x + 1) / n) * 360 - 180;
    const latMax = (Math.atan(Math.sinh(Math.PI * (1 - (2 * coord.y) / n))) * 180) / Math.PI;
    const latMin = (Math.atan(Math.sinh(Math.PI * (1 - (2 * (coord.y + 1)) / n))) * 180) / Math.PI;

    function project(lat, lon) {
      const x = (lon * 20037508.34) / 180;
      let y = Math.log(Math.tan(((90 + lat) * Math.PI) / 360)) / (Math.PI / 180);
      y = (y * 20037508.34) / 180;
      return [x, y];
    }

    const sw = project(latMin, lonMin);
    const ne = project(latMax, lonMax);
    const bbox = [sw[0], sw[1], ne[0], ne[1]].join(",");
    return (
      base +
      "?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap" +
      "&LAYERS=" + encodeURIComponent(layers) +
      "&STYLES=&FORMAT=image/png&TRANSPARENT=TRUE" +
      "&SRS=EPSG:3857&BBOX=" + bbox +
      "&WIDTH=" + tileSize + "&HEIGHT=" + tileSize
    );
  }

  function makeGoogleOverlay(map, base, layers, opacity) {
    const type = new google.maps.ImageMapType({
      getTileUrl: function (coord, zoom) {
        if (zoom < 12) return null;
        return googleWmsTileUrl(base, layers, coord, zoom);
      },
      tileSize: new google.maps.Size(256, 256),
      opacity: opacity == null ? 0.7 : opacity,
      name: layers
    });
    map.overlayMapTypes.push(type);
    return type;
  }

  function initLeaflet(root) {
    const mapEl = root.querySelector("[data-parcel-map]");
    const status = root.querySelector("[data-parcel-status]");
    const map = L.map(mapEl, {
      center: FL_CENTER,
      zoom: FL_ZOOM,
      scrollWheelZoom: true,
      maxZoom: 21
    });

    const ortho = L.tileLayer.wms(WMS_OFW, {
      layers: "OFW",
      format: "image/png",
      transparent: false,
      version: "1.3.0",
      attribution: "© Digitaal Vlaanderen — Orthofoto",
      maxZoom: 21
    });
    const esri = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      { attribution: "© Esri", maxZoom: 19 }
    );
    const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
      maxZoom: 19
    });
    const grbBase = wms(WMS_GRB, "GRB_BSK", 1);

    const parcels = wms(WMS_GRB, "GRB_ADP_GRENS", 0.95);
    const parcelsFill = wms(WMS_GRB, "GRB_ADP", 0.35);
    const buildings = wms(WMS_GRB, "GRB_GBG", 0.7);
    const cadCapakey = wms(WMS_CAD, "Capakey", 0.65);
    const cadCanu = wms(WMS_CAD, "CaNu", 0.9);
    const gewestplan = wms(WMS_RO, "lu:lu_gwp_gv", 0.45);
    const gemRup = wms(WMS_RO, "lu:lu_gemrup_gv", 0.5);

    ortho.addTo(map);
    parcelsFill.addTo(map);
    parcels.addTo(map);

    const bases = {
      "Luchtfoto Geopunt": ortho,
      "Luchtfoto satelliet": esri,
      Straatkaart: osm,
      "GRB-basiskaart": grbBase
    };
    const overlays = {
      "Perceelsgrenzen (GRB)": parcels,
      "Percelen vlak (GRB)": parcelsFill,
      "Gebouwen (GRB)": buildings,
      "CadGIS Capakey": cadCapakey,
      "CadGIS perceelnummers": cadCanu,
      "Gewestplan (RO)": gewestplan,
      "Gemeentelijk RUP (RO)": gemRup
    };

    L.control.layers(bases, overlays, { collapsed: true, position: "topright" }).addTo(map);

    let marker = null;
    function setPoint(lat, lon, label) {
      if (marker) map.removeLayer(marker);
      marker = L.marker([lat, lon]).addTo(map);
      if (label) marker.bindPopup(escapeHtml(label)).openPopup();
      map.setView([lat, lon], Math.max(map.getZoom(), 18));
      const gLink = root.querySelector("[data-parcel-google]");
      if (gLink) {
        gLink.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(lat + "," + lon);
        gLink.hidden = false;
      }
      if (status) status.textContent = label || (lat.toFixed(5) + ", " + lon.toFixed(5));
    }

    return { map: map, setPoint: setPoint, invalidate: function () { map.invalidateSize(); } };
  }

  function initGoogle(root) {
    const mapEl = root.querySelector("[data-parcel-map]");
    const status = root.querySelector("[data-parcel-status]");
    const map = new google.maps.Map(mapEl, {
      center: { lat: FL_CENTER[0], lng: FL_CENTER[1] },
      zoom: FL_ZOOM,
      mapTypeId: "hybrid",
      streetViewControl: false,
      fullscreenControl: true,
      mapTypeControl: true,
      mapTypeControlOptions: {
        mapTypeIds: ["hybrid", "roadmap", "satellite", "terrain"]
      }
    });

    const layerState = {
      parcels: makeGoogleOverlay(map, WMS_GRB, "GRB_ADP_GRENS", 0.9),
      parcelsFill: makeGoogleOverlay(map, WMS_GRB, "GRB_ADP", 0.35),
      buildings: null,
      cad: null,
      canu: null,
      gwp: null,
      rup: null
    };

    root.querySelectorAll("[data-gmap-layer]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const id = btn.getAttribute("data-gmap-layer");
        const on = btn.getAttribute("aria-pressed") !== "true";
        btn.setAttribute("aria-pressed", on ? "true" : "false");
        const defs = {
          buildings: [WMS_GRB, "GRB_GBG", 0.7],
          cad: [WMS_CAD, "Capakey", 0.65],
          canu: [WMS_CAD, "CaNu", 0.9],
          gwp: [WMS_RO, "lu:lu_gwp_gv", 0.45],
          rup: [WMS_RO, "lu:lu_gemrup_gv", 0.5],
          parcels: [WMS_GRB, "GRB_ADP_GRENS", 0.9],
          parcelsFill: [WMS_GRB, "GRB_ADP", 0.35]
        };
        if (!defs[id]) return;
        if (on) {
          if (!layerState[id]) {
            layerState[id] = makeGoogleOverlay(map, defs[id][0], defs[id][1], defs[id][2]);
          }
        } else if (layerState[id]) {
          const idx = map.overlayMapTypes.getArray().indexOf(layerState[id]);
          if (idx >= 0) map.overlayMapTypes.removeAt(idx);
          layerState[id] = null;
        }
      });
    });

    const toggles = root.querySelector("[data-gmap-toggles]");
    if (toggles) toggles.hidden = false;

    let marker = null;
    function setPoint(lat, lon, label) {
      if (marker) marker.setMap(null);
      marker = new google.maps.Marker({
        position: { lat: lat, lng: lon },
        map: map,
        title: label || ""
      });
      map.panTo({ lat: lat, lng: lon });
      map.setZoom(Math.max(map.getZoom(), 18));
      const gLink = root.querySelector("[data-parcel-google]");
      if (gLink) {
        gLink.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(lat + "," + lon);
        gLink.hidden = false;
      }
      if (status) status.textContent = label || (lat.toFixed(5) + ", " + lon.toFixed(5));
    }

    return {
      map: map,
      setPoint: setPoint,
      invalidate: function () {
        google.maps.event.trigger(map, "resize");
      }
    };
  }

  function wireSearch(root, api) {
    const input = root.querySelector("[data-parcel-q]");
    const list = root.querySelector("[data-parcel-list]");
    if (!input || !list) return;

    let items = [];
    let active = -1;
    let timer;
    let seq = 0;

    function hide() {
      list.hidden = true;
      list.innerHTML = "";
      items = [];
      active = -1;
      input.setAttribute("aria-expanded", "false");
    }

    function pick(i) {
      const row = items[i];
      if (!row) return;
      input.value = row.label;
      hide();
      locate(row.label);
    }

    function show(rows) {
      items = rows.slice(0, 8);
      active = items.length ? 0 : -1;
      list.innerHTML = items
        .map(function (r, i) {
          return (
            '<li><button type="button" class="parcel-opt" role="option" aria-selected="' +
            (i === 0 ? "true" : "false") +
            '">' +
            escapeHtml(r.label) +
            "</button></li>"
          );
        })
        .join("");
      list.hidden = !items.length;
      input.setAttribute("aria-expanded", items.length ? "true" : "false");
      list.querySelectorAll(".parcel-opt").forEach(function (btn, i) {
        btn.addEventListener("mousedown", function (e) {
          e.preventDefault();
          pick(i);
        });
      });
    }

    async function suggest(q) {
      const id = ++seq;
      try {
        const res = await fetch(SUGGEST + "?c=8&q=" + encodeURIComponent(q));
        if (id !== seq || !res.ok) return;
        const json = await res.json();
        const rows = (json.SuggestionResult || []).map(function (label) {
          return { label: label };
        });
        show(rows);
      } catch (e) {
        /* ignore */
      }
    }

    async function locate(q) {
      const status = root.querySelector("[data-parcel-status]");
      if (status) status.textContent = "Zoeken…";
      try {
        const res = await fetch(LOCATE + "?c=1&q=" + encodeURIComponent(q));
        if (!res.ok) throw new Error("locate");
        const json = await res.json();
        const hit = (json.LocationResult || [])[0];
        if (!hit || !hit.Location) {
          if (status) status.textContent = "Geen coördinaten gevonden voor dit adres.";
          return;
        }
        const lat = hit.Location.Lat_WGS84;
        const lon = hit.Location.Lon_WGS84;
        api.setPoint(lat, lon, hit.FormattedAddress || q);
      } catch (e) {
        if (status) status.textContent = "Adreszoeken mislukt. Probeer opnieuw.";
      }
    }

    input.addEventListener("input", function () {
      const q = input.value.trim();
      clearTimeout(timer);
      if (q.length < 3) {
        hide();
        return;
      }
      timer = setTimeout(function () {
        suggest(q);
      }, 220);
    });

    input.addEventListener("keydown", function (e) {
      if (list.hidden || !items.length) {
        if (e.key === "Enter") {
          e.preventDefault();
          if (input.value.trim().length >= 3) locate(input.value.trim());
        }
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        active = Math.min(active + 1, items.length - 1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        active = Math.max(active - 1, 0);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (active >= 0) pick(active);
      } else if (e.key === "Escape") {
        hide();
      }
      list.querySelectorAll(".parcel-opt").forEach(function (btn, i) {
        btn.setAttribute("aria-selected", i === active ? "true" : "false");
      });
    });

    input.addEventListener("blur", function () {
      setTimeout(hide, 150);
    });

    root.querySelector("[data-parcel-go]")?.addEventListener("click", function () {
      if (input.value.trim().length >= 3) locate(input.value.trim());
    });
  }

  async function boot() {
    const root = document.getElementById("perceelkaart");
    if (!root || root.dataset.ready === "1") return;
    root.dataset.ready = "1";

    const status = root.querySelector("[data-parcel-status]");
    let api;

    try {
      if (hasGoogleKey()) {
        await ensureGoogle();
        api = initGoogle(root);
        root.dataset.engine = "google";
        if (status) status.textContent = "Google Maps + Vlaamse overlays. Zoek een adres.";
      } else {
        await ensureLeaflet();
        api = initLeaflet(root);
        root.dataset.engine = "leaflet";
        if (status) {
          status.textContent =
            "Geopunt-luchtfoto + overlays. Vul een Google Maps-key in js/maps-config.js voor Google Hybrid.";
        }
      }
    } catch (e) {
      if (status) status.textContent = "Kaart kon niet laden. Vernieuw de pagina.";
      return;
    }

    wireSearch(root, api);

    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            api.invalidate();
            io.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    io.observe(root);
    setTimeout(api.invalidate, 400);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
