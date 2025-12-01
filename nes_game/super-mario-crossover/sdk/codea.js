var bienfunction;
var bienfunctionIN;
var idgamedumv = '937';
var intern_so_phut_dumv = 1;
window.alert = function () { };
window.open = function () { };
var methods = ["log", "debug", "warn", "info", "error"];
for (var i = 0; i < methods.length; i++) {
    console[methods[i]] = function () { };
}