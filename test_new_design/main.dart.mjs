
// `modulePromise` is a promise to the `WebAssembly.module` object to be
//   instantiated.
// `importObjectPromise` is a promise to an object that contains any additional
//   imports needed by the module that aren't provided by the standard runtime.
//   The fields on this object will be merged into the importObject with which
//   the module will be instantiated.
// This function returns a promise to the instantiated module.
export const instantiate = async (modulePromise, importObjectPromise) => {
    let dartInstance;

    // Prints to the console
    function printToConsole(value) {
      if (typeof dartPrint == "function") {
        dartPrint(value);
        return;
      }
      if (typeof console == "object" && typeof console.log != "undefined") {
        console.log(value);
        return;
      }
      if (typeof print == "function") {
        print(value);
        return;
      }

      throw "Unable to print message: " + js;
    }

    // Converts a Dart List to a JS array. Any Dart objects will be converted, but
    // this will be cheap for JSValues.
    function arrayFromDartList(constructor, list) {
      const exports = dartInstance.exports;
      const read = exports.$listRead;
      const length = exports.$listLength(list);
      const array = new constructor(length);
      for (let i = 0; i < length; i++) {
        array[i] = read(list, i);
      }
      return array;
    }

    // A special symbol attached to functions that wrap Dart functions.
    const jsWrappedDartFunctionSymbol = Symbol("JSWrappedDartFunction");

    function finalizeWrapper(dartFunction, wrapped) {
      wrapped.dartFunction = dartFunction;
      wrapped[jsWrappedDartFunctionSymbol] = true;
      return wrapped;
    }

    // Imports
    const dart2wasm = {

_1: (x0,x1,x2) => x0.set(x1,x2),
_2: (x0,x1,x2) => x0.set(x1,x2),
_3: (x0,x1) => x0.transferFromImageBitmap(x1),
_4: x0 => x0.arrayBuffer(),
_5: (x0,x1) => x0.transferFromImageBitmap(x1),
_6: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._6(f,arguments.length,x0) }),
_7: x0 => new window.FinalizationRegistry(x0),
_8: (x0,x1,x2,x3) => x0.register(x1,x2,x3),
_9: (x0,x1) => x0.unregister(x1),
_10: (x0,x1,x2) => x0.slice(x1,x2),
_11: (x0,x1) => x0.decode(x1),
_12: (x0,x1) => x0.segment(x1),
_13: () => new TextDecoder(),
_14: x0 => x0.buffer,
_15: x0 => x0.wasmMemory,
_16: () => globalThis.window._flutter_skwasmInstance,
_17: x0 => x0.rasterStartMilliseconds,
_18: x0 => x0.rasterEndMilliseconds,
_19: x0 => x0.imageBitmaps,
_167: x0 => x0.select(),
_168: (x0,x1) => x0.append(x1),
_169: x0 => x0.remove(),
_172: x0 => x0.unlock(),
_177: x0 => x0.getReader(),
_189: x0 => new MutationObserver(x0),
_206: (x0,x1) => new OffscreenCanvas(x0,x1),
_208: (x0,x1,x2) => x0.addEventListener(x1,x2),
_209: (x0,x1,x2) => x0.removeEventListener(x1,x2),
_212: x0 => new ResizeObserver(x0),
_215: (x0,x1) => new Intl.Segmenter(x0,x1),
_216: x0 => x0.next(),
_217: (x0,x1) => new Intl.v8BreakIterator(x0,x1),
_294: x0 => x0.close(),
_295: (x0,x1,x2,x3,x4) => ({type: x0,data: x1,premultiplyAlpha: x2,colorSpaceConversion: x3,preferAnimation: x4}),
_296: x0 => new window.ImageDecoder(x0),
_297: x0 => x0.close(),
_298: x0 => ({frameIndex: x0}),
_299: (x0,x1) => x0.decode(x1),
_302: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._302(f,arguments.length,x0) }),
_303: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._303(f,arguments.length,x0) }),
_304: (x0,x1) => ({addView: x0,removeView: x1}),
_305: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._305(f,arguments.length,x0) }),
_306: f => finalizeWrapper(f, function() { return dartInstance.exports._306(f,arguments.length) }),
_307: (x0,x1) => ({initializeEngine: x0,autoStart: x1}),
_308: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._308(f,arguments.length,x0) }),
_309: x0 => ({runApp: x0}),
_310: x0 => new Uint8Array(x0),
_312: x0 => x0.preventDefault(),
_313: x0 => x0.stopPropagation(),
_314: (x0,x1) => x0.addListener(x1),
_315: (x0,x1) => x0.removeListener(x1),
_316: (x0,x1) => x0.prepend(x1),
_317: x0 => x0.remove(),
_318: x0 => x0.disconnect(),
_319: (x0,x1) => x0.addListener(x1),
_320: (x0,x1) => x0.removeListener(x1),
_322: (x0,x1) => x0.append(x1),
_323: x0 => x0.remove(),
_324: x0 => x0.stopPropagation(),
_328: x0 => x0.preventDefault(),
_329: (x0,x1) => x0.append(x1),
_330: x0 => x0.remove(),
_331: x0 => x0.preventDefault(),
_336: (x0,x1) => x0.appendChild(x1),
_337: (x0,x1,x2) => x0.insertBefore(x1,x2),
_338: (x0,x1) => x0.removeChild(x1),
_339: (x0,x1) => x0.appendChild(x1),
_340: (x0,x1) => x0.transferFromImageBitmap(x1),
_341: (x0,x1) => x0.append(x1),
_342: (x0,x1) => x0.append(x1),
_343: (x0,x1) => x0.append(x1),
_344: x0 => x0.remove(),
_345: x0 => x0.remove(),
_346: x0 => x0.remove(),
_347: (x0,x1) => x0.appendChild(x1),
_348: (x0,x1) => x0.appendChild(x1),
_349: x0 => x0.remove(),
_350: (x0,x1) => x0.append(x1),
_351: (x0,x1) => x0.append(x1),
_352: x0 => x0.remove(),
_353: (x0,x1) => x0.append(x1),
_354: (x0,x1) => x0.append(x1),
_355: (x0,x1,x2) => x0.insertBefore(x1,x2),
_356: (x0,x1) => x0.append(x1),
_357: (x0,x1,x2) => x0.insertBefore(x1,x2),
_358: x0 => x0.remove(),
_359: x0 => x0.remove(),
_360: (x0,x1) => x0.append(x1),
_361: x0 => x0.remove(),
_362: (x0,x1) => x0.append(x1),
_363: x0 => x0.remove(),
_364: x0 => x0.remove(),
_365: x0 => x0.getBoundingClientRect(),
_366: x0 => x0.remove(),
_367: x0 => x0.blur(),
_368: x0 => x0.remove(),
_369: x0 => x0.blur(),
_370: x0 => x0.remove(),
_383: (x0,x1) => x0.append(x1),
_384: x0 => x0.remove(),
_385: (x0,x1) => x0.append(x1),
_386: (x0,x1,x2) => x0.insertBefore(x1,x2),
_387: x0 => x0.preventDefault(),
_388: x0 => x0.preventDefault(),
_389: x0 => x0.preventDefault(),
_390: x0 => x0.preventDefault(),
_391: x0 => x0.remove(),
_392: (x0,x1) => x0.observe(x1),
_393: x0 => x0.disconnect(),
_394: (x0,x1) => x0.appendChild(x1),
_395: (x0,x1) => x0.appendChild(x1),
_396: (x0,x1) => x0.appendChild(x1),
_397: (x0,x1) => x0.append(x1),
_398: x0 => x0.remove(),
_399: (x0,x1) => x0.append(x1),
_401: (x0,x1) => x0.appendChild(x1),
_402: (x0,x1) => x0.append(x1),
_403: x0 => x0.remove(),
_404: (x0,x1) => x0.append(x1),
_408: (x0,x1) => x0.appendChild(x1),
_409: x0 => x0.remove(),
_969: () => globalThis.window.flutterConfiguration,
_970: x0 => x0.assetBase,
_975: x0 => x0.debugShowSemanticsNodes,
_976: x0 => x0.hostElement,
_977: x0 => x0.multiViewEnabled,
_978: x0 => x0.nonce,
_980: x0 => x0.fontFallbackBaseUrl,
_981: x0 => x0.useColorEmoji,
_985: x0 => x0.console,
_986: x0 => x0.devicePixelRatio,
_987: x0 => x0.document,
_988: x0 => x0.history,
_989: x0 => x0.innerHeight,
_990: x0 => x0.innerWidth,
_991: x0 => x0.location,
_992: x0 => x0.navigator,
_993: x0 => x0.visualViewport,
_994: x0 => x0.performance,
_995: (x0,x1) => x0.fetch(x1),
_1000: (x0,x1) => x0.dispatchEvent(x1),
_1001: (x0,x1) => x0.matchMedia(x1),
_1002: (x0,x1) => x0.getComputedStyle(x1),
_1004: x0 => x0.screen,
_1005: (x0,x1) => x0.requestAnimationFrame(x1),
_1006: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1006(f,arguments.length,x0) }),
_1010: (x0,x1) => x0.warn(x1),
_1013: () => globalThis.window,
_1014: () => globalThis.Intl,
_1015: () => globalThis.Symbol,
_1018: x0 => x0.clipboard,
_1019: x0 => x0.maxTouchPoints,
_1020: x0 => x0.vendor,
_1021: x0 => x0.language,
_1022: x0 => x0.platform,
_1023: x0 => x0.userAgent,
_1024: x0 => x0.languages,
_1025: x0 => x0.documentElement,
_1026: (x0,x1) => x0.querySelector(x1),
_1029: (x0,x1) => x0.createElement(x1),
_1031: (x0,x1) => x0.execCommand(x1),
_1035: (x0,x1) => x0.createTextNode(x1),
_1036: (x0,x1) => x0.createEvent(x1),
_1040: x0 => x0.head,
_1041: x0 => x0.body,
_1042: (x0,x1) => x0.title = x1,
_1045: x0 => x0.activeElement,
_1047: x0 => x0.visibilityState,
_1048: () => globalThis.document,
_1049: (x0,x1,x2) => x0.addEventListener(x1,x2),
_1050: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
_1051: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
_1052: (x0,x1,x2) => x0.removeEventListener(x1,x2),
_1055: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1055(f,arguments.length,x0) }),
_1056: x0 => x0.target,
_1058: x0 => x0.timeStamp,
_1059: x0 => x0.type,
_1061: x0 => x0.preventDefault(),
_1065: (x0,x1,x2,x3) => x0.initEvent(x1,x2,x3),
_1070: x0 => x0.firstChild,
_1076: x0 => x0.parentElement,
_1078: x0 => x0.parentNode,
_1081: (x0,x1) => x0.removeChild(x1),
_1082: (x0,x1) => x0.removeChild(x1),
_1083: x0 => x0.isConnected,
_1084: (x0,x1) => x0.textContent = x1,
_1087: (x0,x1) => x0.contains(x1),
_1092: x0 => x0.firstElementChild,
_1094: x0 => x0.nextElementSibling,
_1095: x0 => x0.clientHeight,
_1096: x0 => x0.clientWidth,
_1097: x0 => x0.offsetHeight,
_1098: x0 => x0.offsetWidth,
_1099: x0 => x0.id,
_1100: (x0,x1) => x0.id = x1,
_1103: (x0,x1) => x0.spellcheck = x1,
_1104: x0 => x0.tagName,
_1105: x0 => x0.style,
_1107: (x0,x1) => x0.append(x1),
_1108: (x0,x1) => x0.getAttribute(x1),
_1109: x0 => x0.getBoundingClientRect(),
_1112: (x0,x1) => x0.closest(x1),
_1114: (x0,x1) => x0.querySelectorAll(x1),
_1115: x0 => x0.remove(),
_1116: (x0,x1,x2) => x0.setAttribute(x1,x2),
_1118: (x0,x1) => x0.removeAttribute(x1),
_1119: (x0,x1) => x0.tabIndex = x1,
_1121: (x0,x1) => x0.focus(x1),
_1122: x0 => x0.scrollTop,
_1123: (x0,x1) => x0.scrollTop = x1,
_1124: x0 => x0.scrollLeft,
_1125: (x0,x1) => x0.scrollLeft = x1,
_1126: x0 => x0.classList,
_1127: (x0,x1) => x0.className = x1,
_1131: (x0,x1) => x0.getElementsByClassName(x1),
_1132: x0 => x0.click(),
_1133: (x0,x1) => x0.hasAttribute(x1),
_1136: (x0,x1) => x0.attachShadow(x1),
_1140: (x0,x1) => x0.getPropertyValue(x1),
_1142: (x0,x1,x2,x3) => x0.setProperty(x1,x2,x3),
_1144: (x0,x1) => x0.removeProperty(x1),
_1146: x0 => x0.offsetLeft,
_1147: x0 => x0.offsetTop,
_1148: x0 => x0.offsetParent,
_1150: (x0,x1) => x0.name = x1,
_1151: x0 => x0.content,
_1152: (x0,x1) => x0.content = x1,
_1165: (x0,x1) => x0.nonce = x1,
_1170: x0 => x0.now(),
_1172: (x0,x1) => x0.width = x1,
_1174: (x0,x1) => x0.height = x1,
_1178: (x0,x1) => x0.getContext(x1),
_1251: x0 => x0.width,
_1252: x0 => x0.height,
_1256: x0 => x0.status,
_1258: x0 => x0.body,
_1259: x0 => x0.arrayBuffer(),
_1264: x0 => x0.read(),
_1265: x0 => x0.value,
_1266: x0 => x0.done,
_1268: x0 => x0.name,
_1269: x0 => x0.x,
_1270: x0 => x0.y,
_1273: x0 => x0.top,
_1274: x0 => x0.right,
_1275: x0 => x0.bottom,
_1276: x0 => x0.left,
_1285: x0 => x0.height,
_1286: x0 => x0.width,
_1287: (x0,x1) => x0.value = x1,
_1289: (x0,x1) => x0.placeholder = x1,
_1290: (x0,x1) => x0.name = x1,
_1291: x0 => x0.selectionDirection,
_1292: x0 => x0.selectionStart,
_1293: x0 => x0.selectionEnd,
_1296: x0 => x0.value,
_1298: (x0,x1,x2) => x0.setSelectionRange(x1,x2),
_1303: x0 => x0.readText(),
_1304: (x0,x1) => x0.writeText(x1),
_1305: x0 => x0.altKey,
_1306: x0 => x0.code,
_1307: x0 => x0.ctrlKey,
_1308: x0 => x0.key,
_1309: x0 => x0.keyCode,
_1310: x0 => x0.location,
_1311: x0 => x0.metaKey,
_1312: x0 => x0.repeat,
_1313: x0 => x0.shiftKey,
_1314: x0 => x0.isComposing,
_1315: (x0,x1) => x0.getModifierState(x1),
_1316: x0 => x0.state,
_1319: (x0,x1) => x0.go(x1),
_1320: (x0,x1,x2,x3) => x0.pushState(x1,x2,x3),
_1321: (x0,x1,x2,x3) => x0.replaceState(x1,x2,x3),
_1322: x0 => x0.pathname,
_1323: x0 => x0.search,
_1324: x0 => x0.hash,
_1327: x0 => x0.state,
_1333: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1333(f,arguments.length,x0,x1) }),
_1335: (x0,x1,x2) => x0.observe(x1,x2),
_1338: x0 => x0.attributeName,
_1339: x0 => x0.type,
_1340: x0 => x0.matches,
_1344: x0 => x0.matches,
_1345: x0 => x0.relatedTarget,
_1346: x0 => x0.clientX,
_1347: x0 => x0.clientY,
_1348: x0 => x0.offsetX,
_1349: x0 => x0.offsetY,
_1352: x0 => x0.button,
_1353: x0 => x0.buttons,
_1354: x0 => x0.ctrlKey,
_1355: (x0,x1) => x0.getModifierState(x1),
_1356: x0 => x0.pointerId,
_1357: x0 => x0.pointerType,
_1358: x0 => x0.pressure,
_1359: x0 => x0.tiltX,
_1360: x0 => x0.tiltY,
_1361: x0 => x0.getCoalescedEvents(),
_1362: x0 => x0.deltaX,
_1363: x0 => x0.deltaY,
_1364: x0 => x0.wheelDeltaX,
_1365: x0 => x0.wheelDeltaY,
_1366: x0 => x0.deltaMode,
_1371: x0 => x0.changedTouches,
_1373: x0 => x0.clientX,
_1374: x0 => x0.clientY,
_1375: x0 => x0.data,
_1376: (x0,x1) => x0.type = x1,
_1377: (x0,x1) => x0.max = x1,
_1378: (x0,x1) => x0.min = x1,
_1379: (x0,x1) => x0.value = x1,
_1380: x0 => x0.value,
_1381: x0 => x0.disabled,
_1382: (x0,x1) => x0.disabled = x1,
_1383: (x0,x1) => x0.placeholder = x1,
_1384: (x0,x1) => x0.name = x1,
_1385: (x0,x1) => x0.autocomplete = x1,
_1386: x0 => x0.selectionDirection,
_1387: x0 => x0.selectionStart,
_1388: x0 => x0.selectionEnd,
_1392: (x0,x1,x2) => x0.setSelectionRange(x1,x2),
_1399: (x0,x1) => x0.add(x1),
_1402: (x0,x1) => x0.noValidate = x1,
_1403: (x0,x1) => x0.method = x1,
_1404: (x0,x1) => x0.action = x1,
_1409: (x0,x1) => x0.getContext(x1),
_1412: x0 => x0.convertToBlob(),
_1431: x0 => x0.orientation,
_1432: x0 => x0.width,
_1433: x0 => x0.height,
_1434: (x0,x1) => x0.lock(x1),
_1451: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1451(f,arguments.length,x0,x1) }),
_1461: x0 => x0.length,
_1462: (x0,x1) => x0.item(x1),
_1463: x0 => x0.length,
_1464: (x0,x1) => x0.item(x1),
_1465: x0 => x0.iterator,
_1466: x0 => x0.Segmenter,
_1467: x0 => x0.v8BreakIterator,
_1470: x0 => x0.done,
_1471: x0 => x0.value,
_1472: x0 => x0.index,
_1476: (x0,x1) => x0.adoptText(x1),
_1478: x0 => x0.first(),
_1479: x0 => x0.next(),
_1480: x0 => x0.current(),
_1493: x0 => x0.hostElement,
_1494: x0 => x0.viewConstraints,
_1496: x0 => x0.maxHeight,
_1497: x0 => x0.maxWidth,
_1498: x0 => x0.minHeight,
_1499: x0 => x0.minWidth,
_1500: x0 => x0.loader,
_1501: () => globalThis._flutter,
_1502: (x0,x1) => x0.didCreateEngineInitializer(x1),
_1503: (x0,x1,x2) => x0.call(x1,x2),
_1504: () => globalThis.Promise,
_1505: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1505(f,arguments.length,x0,x1) }),
_1508: x0 => x0.length,
_1511: x0 => x0.tracks,
_1515: x0 => x0.image,
_1520: x0 => x0.codedWidth,
_1521: x0 => x0.codedHeight,
_1524: x0 => x0.duration,
_1528: x0 => x0.ready,
_1529: x0 => x0.selectedTrack,
_1530: x0 => x0.repetitionCount,
_1531: x0 => x0.frameCount,
_1599: x0 => x0.remove(),
_1600: x0 => globalThis.URL.createObjectURL(x0),
_1601: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1601(f,arguments.length,x0) }),
_1602: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1602(f,arguments.length,x0) }),
_1603: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1603(f,arguments.length,x0) }),
_1604: (x0,x1) => x0.querySelector(x1),
_1605: (x0,x1) => x0.createElement(x1),
_1606: (x0,x1) => x0.append(x1),
_1608: (x0,x1) => x0.replaceChildren(x1),
_1609: (x0,x1) => x0.append(x1),
_1610: x0 => x0.click(),
_1612: x0 => ({type: x0}),
_1613: (x0,x1) => new Blob(x0,x1),
_1614: x0 => globalThis.URL.createObjectURL(x0),
_1615: (x0,x1) => x0.getElementById(x1),
_1616: (x0,x1,x2) => x0.setAttribute(x1,x2),
_1617: (x0,x1,x2) => x0.setAttribute(x1,x2),
_1618: (x0,x1) => x0.append(x1),
_1619: (x0,x1) => x0.getElementById(x1),
_1620: (x0,x1,x2) => x0.setAttribute(x1,x2),
_1621: (x0,x1,x2) => x0.setAttribute(x1,x2),
_1622: (x0,x1,x2) => x0.setAttribute(x1,x2),
_1623: (x0,x1,x2) => x0.setAttribute(x1,x2),
_1624: (x0,x1,x2) => x0.removeEventListener(x1,x2),
_1625: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1625(f,arguments.length,x0) }),
_1626: (x0,x1,x2) => x0.addEventListener(x1,x2),
_1627: (x0,x1) => x0.append(x1),
_1628: x0 => x0.remove(),
_1629: x0 => x0.remove(),
_1630: x0 => globalThis.URL.createObjectURL(x0),
_1631: (x0,x1) => x0.append(x1),
_1632: x0 => x0.click(),
_1633: x0 => x0.remove(),
_1659: x0 => new Array(x0),
_1661: (o, t) => typeof o === t,
_1662: (o, c) => o instanceof c,
_1666: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1666(f,arguments.length,x0) }),
_1667: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1667(f,arguments.length,x0) }),
_1693: (decoder, codeUnits) => decoder.decode(codeUnits),
_1694: () => new TextDecoder("utf-8", {fatal: true}),
_1695: () => new TextDecoder("utf-8", {fatal: false}),
_1696: v => v.toString(),
_1697: (d, digits) => d.toFixed(digits),
_1701: x0 => new WeakRef(x0),
_1702: x0 => x0.deref(),
_1708: Date.now,
_1710: s => new Date(s * 1000).getTimezoneOffset() * 60 ,
_1711: s => {
      if (!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(s)) {
        return NaN;
      }
      return parseFloat(s);
    },
_1712: () => {
          let stackString = new Error().stack.toString();
          let frames = stackString.split('\n');
          let drop = 2;
          if (frames[0] === 'Error') {
              drop += 1;
          }
          return frames.slice(drop).join('\n');
        },
_1713: () => typeof dartUseDateNowForTicks !== "undefined",
_1714: () => 1000 * performance.now(),
_1715: () => Date.now(),
_1716: () => {
      // On browsers return `globalThis.location.href`
      if (globalThis.location != null) {
        return globalThis.location.href;
      }
      return null;
    },
_1717: () => {
        return typeof process != "undefined" &&
               Object.prototype.toString.call(process) == "[object process]" &&
               process.platform == "win32"
      },
_1718: () => new WeakMap(),
_1719: (map, o) => map.get(o),
_1720: (map, o, v) => map.set(o, v),
_1721: () => globalThis.WeakRef,
_1732: s => JSON.stringify(s),
_1733: s => printToConsole(s),
_1734: a => a.join(''),
_1737: (s, t) => s.split(t),
_1738: s => s.toLowerCase(),
_1739: s => s.toUpperCase(),
_1740: s => s.trim(),
_1741: s => s.trimLeft(),
_1742: s => s.trimRight(),
_1744: (s, p, i) => s.indexOf(p, i),
_1745: (s, p, i) => s.lastIndexOf(p, i),
_1747: Object.is,
_1748: s => s.toUpperCase(),
_1749: s => s.toLowerCase(),
_1750: (a, i) => a.push(i),
_1754: a => a.pop(),
_1755: (a, i) => a.splice(i, 1),
_1757: (a, s) => a.join(s),
_1758: (a, s, e) => a.slice(s, e),
_1760: (a, b) => a == b ? 0 : (a > b ? 1 : -1),
_1761: a => a.length,
_1763: (a, i) => a[i],
_1764: (a, i, v) => a[i] = v,
_1765: (a, t) => a.concat(t),
_1766: (o, offsetInBytes, lengthInBytes) => {
      var dst = new ArrayBuffer(lengthInBytes);
      new Uint8Array(dst).set(new Uint8Array(o, offsetInBytes, lengthInBytes));
      return new DataView(dst);
    },
_1767: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
_1768: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),
_1769: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
_1770: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
_1771: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
_1772: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
_1773: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
_1775: (o, start, length) => new BigInt64Array(o.buffer, o.byteOffset + start, length),
_1776: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
_1777: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
_1778: (t, s) => t.set(s),
_1780: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
_1781: o => o.byteLength,
_1782: o => o.buffer,
_1783: o => o.byteOffset,
_1784: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength').get),
_1785: (b, o) => new DataView(b, o),
_1786: (b, o, l) => new DataView(b, o, l),
_1787: Function.prototype.call.bind(DataView.prototype.getUint8),
_1788: Function.prototype.call.bind(DataView.prototype.setUint8),
_1789: Function.prototype.call.bind(DataView.prototype.getInt8),
_1790: Function.prototype.call.bind(DataView.prototype.setInt8),
_1791: Function.prototype.call.bind(DataView.prototype.getUint16),
_1792: Function.prototype.call.bind(DataView.prototype.setUint16),
_1793: Function.prototype.call.bind(DataView.prototype.getInt16),
_1794: Function.prototype.call.bind(DataView.prototype.setInt16),
_1795: Function.prototype.call.bind(DataView.prototype.getUint32),
_1796: Function.prototype.call.bind(DataView.prototype.setUint32),
_1797: Function.prototype.call.bind(DataView.prototype.getInt32),
_1798: Function.prototype.call.bind(DataView.prototype.setInt32),
_1801: Function.prototype.call.bind(DataView.prototype.getBigInt64),
_1802: Function.prototype.call.bind(DataView.prototype.setBigInt64),
_1803: Function.prototype.call.bind(DataView.prototype.getFloat32),
_1804: Function.prototype.call.bind(DataView.prototype.setFloat32),
_1805: Function.prototype.call.bind(DataView.prototype.getFloat64),
_1806: Function.prototype.call.bind(DataView.prototype.setFloat64),
_1807: (x0,x1) => x0.getRandomValues(x1),
_1808: x0 => new Uint8Array(x0),
_1809: () => globalThis.crypto,
_1820: (o, t) => o instanceof t,
_1822: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1822(f,arguments.length,x0) }),
_1823: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1823(f,arguments.length,x0) }),
_1824: o => Object.keys(o),
_1825: (ms, c) =>
              setTimeout(() => dartInstance.exports.$invokeCallback(c),ms),
_1826: (handle) => clearTimeout(handle),
_1827: (ms, c) =>
          setInterval(() => dartInstance.exports.$invokeCallback(c), ms),
_1828: (handle) => clearInterval(handle),
_1829: (c) =>
              queueMicrotask(() => dartInstance.exports.$invokeCallback(c)),
_1830: () => Date.now(),
_1831: (x0,x1,x2) => x0.transaction(x1,x2),
_1832: (x0,x1) => x0.objectStore(x1),
_1833: (x0,x1) => x0.getAllKeys(x1),
_1834: (x0,x1) => x0.getAll(x1),
_1836: (x0,x1) => x0.delete(x1),
_1837: (x0,x1,x2) => x0.put(x1,x2),
_1838: x0 => x0.clear(),
_1839: x0 => x0.close(),
_1841: (x0,x1,x2) => x0.open(x1,x2),
_1846: (x0,x1) => x0.contains(x1),
_1847: (x0,x1) => x0.createObjectStore(x1),
_1848: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1848(f,arguments.length,x0) }),
_1849: (x0,x1) => x0.contains(x1),
_1850: (x0,x1) => x0.contains(x1),
_1851: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1851(f,arguments.length,x0) }),
_1882: () => new XMLHttpRequest(),
_1883: (x0,x1,x2,x3) => x0.open(x1,x2,x3),
_1884: (x0,x1,x2) => x0.setRequestHeader(x1,x2),
_1885: (x0,x1) => x0.send(x1),
_1886: x0 => x0.abort(),
_1887: x0 => x0.getAllResponseHeaders(),
_1888: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1888(f,arguments.length,x0) }),
_1889: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1889(f,arguments.length,x0) }),
_1890: x0 => x0.openCursor(),
_1891: x0 => x0.continue(),
_1892: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1892(f,arguments.length,x0) }),
_1893: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1893(f,arguments.length,x0) }),
_1896: () => new XMLHttpRequest(),
_1897: x0 => x0.send(),
_1899: () => new FileReader(),
_1900: (x0,x1) => x0.readAsArrayBuffer(x1),
_1908: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1908(f,arguments.length,x0) }),
_1909: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1909(f,arguments.length,x0) }),
_1910: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
_1911: (x0,x1,x2,x3) => x0.removeEventListener(x1,x2,x3),
_1951: (x0,x1) => x0.item(x1),
_1953: (s, m) => {
          try {
            return new RegExp(s, m);
          } catch (e) {
            return String(e);
          }
        },
_1954: (x0,x1) => x0.exec(x1),
_1955: (x0,x1) => x0.test(x1),
_1956: (x0,x1) => x0.exec(x1),
_1957: (x0,x1) => x0.exec(x1),
_1958: x0 => x0.pop(),
_1962: (x0,x1,x2) => x0[x1] = x2,
_1964: o => o === undefined,
_1965: o => typeof o === 'boolean',
_1966: o => typeof o === 'number',
_1968: o => typeof o === 'string',
_1971: o => o instanceof Int8Array,
_1972: o => o instanceof Uint8Array,
_1973: o => o instanceof Uint8ClampedArray,
_1974: o => o instanceof Int16Array,
_1975: o => o instanceof Uint16Array,
_1976: o => o instanceof Int32Array,
_1977: o => o instanceof Uint32Array,
_1978: o => o instanceof Float32Array,
_1979: o => o instanceof Float64Array,
_1980: o => o instanceof ArrayBuffer,
_1981: o => o instanceof DataView,
_1982: o => o instanceof Array,
_1983: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
_1985: o => {
            const proto = Object.getPrototypeOf(o);
            return proto === Object.prototype || proto === null;
          },
_1986: o => o instanceof RegExp,
_1987: (l, r) => l === r,
_1988: o => o,
_1989: o => o,
_1990: o => o,
_1991: b => !!b,
_1992: o => o.length,
_1995: (o, i) => o[i],
_1996: f => f.dartFunction,
_1997: l => arrayFromDartList(Int8Array, l),
_1998: (data, length) => {
          const jsBytes = new Uint8Array(length);
          const getByte = dartInstance.exports.$uint8ListGet;
          for (let i = 0; i < length; i++) {
            jsBytes[i] = getByte(data, i);
          }
          return jsBytes;
        },
_1999: l => arrayFromDartList(Uint8ClampedArray, l),
_2000: l => arrayFromDartList(Int16Array, l),
_2001: l => arrayFromDartList(Uint16Array, l),
_2002: l => arrayFromDartList(Int32Array, l),
_2003: l => arrayFromDartList(Uint32Array, l),
_2004: l => arrayFromDartList(Float32Array, l),
_2005: l => arrayFromDartList(Float64Array, l),
_2006: (data, length) => {
          const read = dartInstance.exports.$byteDataGetUint8;
          const view = new DataView(new ArrayBuffer(length));
          for (let i = 0; i < length; i++) {
              view.setUint8(i, read(data, i));
          }
          return view;
        },
_2007: l => arrayFromDartList(Array, l),
_2008:       (s, length) => {
        if (length == 0) return '';

        const read = dartInstance.exports.$stringRead1;
        let result = '';
        let index = 0;
        const chunkLength = Math.min(length - index, 500);
        let array = new Array(chunkLength);
        while (index < length) {
          const newChunkLength = Math.min(length - index, 500);
          for (let i = 0; i < newChunkLength; i++) {
            array[i] = read(s, index++);
          }
          if (newChunkLength < chunkLength) {
            array = array.slice(0, newChunkLength);
          }
          result += String.fromCharCode(...array);
        }
        return result;
      }
      ,
_2009:     (s, length) => {
      if (length == 0) return '';

      const read = dartInstance.exports.$stringRead2;
      let result = '';
      let index = 0;
      const chunkLength = Math.min(length - index, 500);
      let array = new Array(chunkLength);
      while (index < length) {
        const newChunkLength = Math.min(length - index, 500);
        for (let i = 0; i < newChunkLength; i++) {
          array[i] = read(s, index++);
        }
        if (newChunkLength < chunkLength) {
          array = array.slice(0, newChunkLength);
        }
        result += String.fromCharCode(...array);
      }
      return result;
    }
    ,
_2010:     (s) => {
      let length = s.length;
      let range = 0;
      for (let i = 0; i < length; i++) {
        range |= s.codePointAt(i);
      }
      const exports = dartInstance.exports;
      if (range < 256) {
        if (length <= 10) {
          if (length == 1) {
            return exports.$stringAllocate1_1(s.codePointAt(0));
          }
          if (length == 2) {
            return exports.$stringAllocate1_2(s.codePointAt(0), s.codePointAt(1));
          }
          if (length == 3) {
            return exports.$stringAllocate1_3(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2));
          }
          if (length == 4) {
            return exports.$stringAllocate1_4(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3));
          }
          if (length == 5) {
            return exports.$stringAllocate1_5(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4));
          }
          if (length == 6) {
            return exports.$stringAllocate1_6(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4), s.codePointAt(5));
          }
          if (length == 7) {
            return exports.$stringAllocate1_7(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4), s.codePointAt(5), s.codePointAt(6));
          }
          if (length == 8) {
            return exports.$stringAllocate1_8(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4), s.codePointAt(5), s.codePointAt(6), s.codePointAt(7));
          }
          if (length == 9) {
            return exports.$stringAllocate1_9(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4), s.codePointAt(5), s.codePointAt(6), s.codePointAt(7), s.codePointAt(8));
          }
          if (length == 10) {
            return exports.$stringAllocate1_10(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4), s.codePointAt(5), s.codePointAt(6), s.codePointAt(7), s.codePointAt(8), s.codePointAt(9));
          }
        }
        const dartString = exports.$stringAllocate1(length);
        const write = exports.$stringWrite1;
        for (let i = 0; i < length; i++) {
          write(dartString, i, s.codePointAt(i));
        }
        return dartString;
      } else {
        const dartString = exports.$stringAllocate2(length);
        const write = exports.$stringWrite2;
        for (let i = 0; i < length; i++) {
          write(dartString, i, s.charCodeAt(i));
        }
        return dartString;
      }
    }
    ,
_2011: () => ({}),
_2012: () => [],
_2013: l => new Array(l),
_2014: () => globalThis,
_2015: (constructor, args) => {
      const factoryFunction = constructor.bind.apply(
          constructor, [null, ...args]);
      return new factoryFunction();
    },
_2016: (o, p) => p in o,
_2017: (o, p) => o[p],
_2018: (o, p, v) => o[p] = v,
_2019: (o, m, a) => o[m].apply(o, a),
_2021: o => String(o),
_2022: (p, s, f) => p.then(s, f),
_2023: s => {
      if (/[[\]{}()*+?.\\^$|]/.test(s)) {
          s = s.replace(/[[\]{}()*+?.\\^$|]/g, '\\$&');
      }
      return s;
    },
_2026: x0 => x0.index,
_2028: x0 => x0.length,
_2030: (x0,x1) => x0[x1],
_2033: x0 => x0.flags,
_2034: x0 => x0.multiline,
_2035: x0 => x0.ignoreCase,
_2036: x0 => x0.unicode,
_2037: x0 => x0.dotAll,
_2038: (x0,x1) => x0.lastIndex = x1,
_2039: (o, p) => p in o,
_2040: (o, p) => o[p],
_2119: (x0,x1) => x0.withCredentials = x1,
_2121: x0 => x0.responseURL,
_2122: x0 => x0.status,
_2123: x0 => x0.statusText,
_2125: (x0,x1) => x0.responseType = x1,
_2126: x0 => x0.response,
_2233: (x0,x1) => x0.oncancel = x1,
_2239: (x0,x1) => x0.onchange = x1,
_2279: (x0,x1) => x0.onerror = x1,
_2559: (x0,x1) => x0.target = x1,
_2586: (x0,x1) => x0.href = x1,
_3155: (x0,x1) => x0.accept = x1,
_3169: x0 => x0.files,
_3195: (x0,x1) => x0.multiple = x1,
_3213: (x0,x1) => x0.type = x1,
_3941: () => globalThis.window,
_3998: x0 => x0.self,
_3999: x0 => x0.document,
_4021: x0 => x0.navigator,
_4258: x0 => x0.indexedDB,
_4394: x0 => x0.userAgent,
_4395: x0 => x0.vendor,
_7599: x0 => x0.type,
_7600: x0 => x0.target,
_7738: () => globalThis.document,
_7829: x0 => x0.body,
_8190: (x0,x1) => x0.id = x1,
_8203: (x0,x1) => x0.innerHTML = x1,
_9883: x0 => x0.size,
_9884: x0 => x0.type,
_9891: x0 => x0.name,
_9892: x0 => x0.lastModified,
_9898: x0 => x0.length,
_9913: x0 => x0.result,
_11900: x0 => x0.result,
_11901: x0 => x0.error,
_11906: (x0,x1) => x0.onsuccess = x1,
_11908: (x0,x1) => x0.onerror = x1,
_11912: (x0,x1) => x0.onupgradeneeded = x1,
_11933: x0 => x0.version,
_11934: x0 => x0.objectStoreNames,
_12006: x0 => x0.key,
_12009: x0 => x0.value
    };

    const baseImports = {
        dart2wasm: dart2wasm,


        Math: Math,
        Date: Date,
        Object: Object,
        Array: Array,
        Reflect: Reflect,
    };

    const jsStringPolyfill = {
        "charCodeAt": (s, i) => s.charCodeAt(i),
        "compare": (s1, s2) => {
            if (s1 < s2) return -1;
            if (s1 > s2) return 1;
            return 0;
        },
        "concat": (s1, s2) => s1 + s2,
        "equals": (s1, s2) => s1 === s2,
        "fromCharCode": (i) => String.fromCharCode(i),
        "length": (s) => s.length,
        "substring": (s, a, b) => s.substring(a, b),
    };

    dartInstance = await WebAssembly.instantiate(await modulePromise, {
        ...baseImports,
        ...(await importObjectPromise),
        "wasm:js-string": jsStringPolyfill,
    });

    return dartInstance;
}

// Call the main function for the instantiated module
// `moduleInstance` is the instantiated dart2wasm module
// `args` are any arguments that should be passed into the main function.
export const invoke = (moduleInstance, ...args) => {
  moduleInstance.exports.$invokeMain(args);
}
