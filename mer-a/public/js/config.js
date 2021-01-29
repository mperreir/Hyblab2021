'use strict';

/**
 * Configuration file that stores all useful global variables.
 */

/**
 * =============================
 * 
 *              API
 * 
 * =============================
 */

const ROOT = '/mer-a/';
const API_URL = 'api/';
const API_REGIONS_ID = 'all/regions';
const API_TYPES_ID = 'all/types';
const API_LEGENDE = 'legende/';

/**
 * ================================
 * 
 *             GLOBALS
 * 
 * ================================
 */

/**
 * Constants definition
 */
const url = window.location.href;

//Colors
const validDepColor = '#88cbce';
const invalidDepColor = '#224255';
const hoveredValidDepColor = '#73b7ba';
const strokeColor = 'black';
const invalidStrokeColor = 'none';
const fontColor = 'white';

//Opacity
const validStrokeOpacity = 1;
const invalidStrokeOpacity = 0.1;

//Strokes
const validStrokeWidth = '2px';
const invalidStrokeWidth = '10px';
const hoveredStrokeWidth = '3px';

/**
 * Variables definition
 */
let categories = null;
let mapFusion = null;

/**
 * ======================================
 * 
 *           PAGE CHOIX LEGENDE
 * 
 * ======================================
 */

/**
 * Constants definition
 */

const narrationFontSize = window.innerHeight*0.023;
const padding = window.innerHeight*0.008;

const narrationSpeed = 45; // 0 : instant ; 1000 : every second.

const circlesSize = 14;
const circlesSizeHovered = 20;

//Colors
const circlesColor = 'white';

//Opacity
const circlesOpacity = 1;
const circlesHoveredOpacity = 0.6;

//Strokes
const circlesStrokeWidth = '3px';

/**
 * Variables definition
 */
let perso = null;
let categorie = null;
let legendes = null;

/**
 * ===================================
 * 
 *           PAGE CHOIX DEP
 * 
 * ===================================
 */

/**
 * Constants definition
 */

//Fonts
const mapFontSize = 24;

/**
 * ====================================
 * 
 *           PAGE CHOIX PERSO
 * 
 * ====================================
 */

/**
 * Constants definition
 */
const ordreCategories = [1,2,3];