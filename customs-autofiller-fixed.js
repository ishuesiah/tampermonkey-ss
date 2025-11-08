// ==UserScript==
// @name         ShipStation Customs Autofiller (FIXED - Harmonization)
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Automatically fill customs declarations with CUSMA database - FIXED to use aria-label="Harmonization"
// @author       Your Name
// @match        https://ship*.shipstation.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // ============================================================================
    // CUSMA DATABASE - Complete Product Data
    // ============================================================================

    const CUSMA_DATABASE = {
    "2025Q4-DAI-AUT": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-DLP-AUT-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2025Q4-DAI-CHA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-DLP-ELD-IM-AA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-DLP-ELD-IM-AB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2025Q4-DAI-ELD": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-DLP-ELD-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-DLP-ENC-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-DLP-LIL-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2025Q4-DAI-LIL": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2025Q4-DAI-MID": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-DLP-MO-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-DLP-NIM-IMP": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-DLP-NIM-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-DLP-RIV-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2025Q4-DAI-RIV": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-DLP-TDL-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2025Q4-DAI-TOI": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-DLP-WO-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2025Q4-DAI-WIL": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "INSHR-A5DISC-25W-MS": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INSHR-CLHP-25W-MS": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INSHR-HL-25W-MS": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INSHR-A5-25W-MS": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INSHR-CLHP-25W-SS": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INSHR-HL-25W-SS": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INSHR-A5-25W-SS": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "25-MIN-A5-AUT-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-A5-AUT-IM-AA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-A5-CHB-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-A5-ELD-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-A5-ECF-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-A5-LIL-IM-AA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-A5-LIL-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-A5-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-A5-MO-AA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-A5-MOS-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-A5-NIM-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-A5-RIV-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-A5-RWO-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-A5-RWO-IM-AA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2025Q4-MIN-A5-TOI": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-A5-WOR-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-A5-WOR-IM-AB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-A5-WOR-IM-AA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-A5-WIS-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-B5-AUT-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-B5-CHB-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-B5-CHB-IM-AA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-B5-CHB-IM-AB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-B5-ELD-IM-AB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-B5-ELD-IM-AC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-B5-ELD-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-B5-ELD-IM-AA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-B5-ECF-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-B5-ECF-IM-AA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-B5-LIL-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-B5-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-B5-MOS-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-B5-NIM-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-B5-NIM-IM-AA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-B5-RIV-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-B5-TDL-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-B5-WOR-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-B5-WOR-IM-AA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-A5-AUT": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2025Q4-MIN-CHA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-A5-ELD": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-A5-ENF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2025Q4-MIN-LIL": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2025Q4-MIN-MID": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2025Q4-MIN-MOS": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-A5-NIM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2025Q4-MIN-RIV": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-WKP-MIN-RWO": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-MIN-A5-TDL": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2025Q4-MIN-WIL": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-WKP-MIN-WIS": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2025Q4-MIN-AUT": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-WKP-MIN-CHB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-WKP-MIN-CHB-AA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2025Q4-MIN-ELD": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2025Q4-MIN-ENC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-WKP-MIN-LIL": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-WKP-MIN": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-WKP-MIN-MOS": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2025Q4-MIN-NIM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-WKP-MIN-RIV": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2025Q4-MIN-TOI": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "25-WKP-MIN-WOR": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "INS-HPC-25OV": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INS-HL-25OV": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INS-A5-25OV": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INS-HPC-24RV": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INS-HL-24RV": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INS-A5-24RV": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "25-INS-A5": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INSWKS-CLHP-25-MS": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INSWKS-DISCA5-25-MS": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INSWKS-A5-25-MS": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INS-HL-WKL-MON": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INSCAL-A5DISC-25-MS": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INSCAL-CLHP-25-MS": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INSCAL-HL-25-MS": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INSCAL-A5-25-MS": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INSCAL-A5-25-SS": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "2026Q4-A5MIN-H-CLOTH-AUT": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-H-CLOTH-CHB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-H-CLOTH-ENF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-H-CLOTH-FWN": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-H-CLOTH-MOS": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-H-CLOTH-RIV": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-H-CLOTH-SCA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-H-HARD-AUT": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-H-HARD-BLF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-H-HARD-CHB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-H-HARD-ENF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-H-HARD-FWN": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-H-HARD-MOS": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-H-HARD-PLG": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-H-HARD -RIV": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-H-HARD-SCA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-H-HARD-WDI": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-H-HARD-WIT": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-H-HARD-WDL": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-H-PAPER-CHB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-H-PAPER-MOS": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-H-PAPER-RIV": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-H-PAPER-SCA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-V-CLOTH-AUT": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-V-CLOTH-CHB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-V-CLOTH-ENF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-V-CLOTH-FWN": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-V-CLOTH-MOS": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-V-CLOTH-RIV": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-V-CLOTH-SCA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-V-HARD-AUT": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-V-HARD-BLF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-V-HARD-CHB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-V-HARD-ENF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-V-HARD-FWN": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-V-HARD-MOS": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-V-HARD-PLG": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-V-HARD-RIV": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-V-HARD-SCA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-V-HARD-WDI": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-V-HARD-WIT": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-V-HARD-WDL": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-V-PAPER-CHB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-V-PAPER-MOS": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-V-PAPER-RIV": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-A5MIN-V-PAPER-SCA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-B5MIN-CLOTH-AUT": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-B5MIN-CLOTH-CHB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-B5MIN-CLOTH-ENF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-B5MIN-CLOTH-FWN": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-B5MIN-CLOTH-MOS": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-B5MIN-CLOTH-RIV": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-B5MIN-CLOTH-SCA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-B5MIN-HARD-AUT": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-COMBO-HARD-BLF-2": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-B5MIN-HARD-CHB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-B5MIN-HARD-ENF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-B5MIN-HARD-FWN": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-B5MIN-HARD-MOS": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-B5MIN-HARD-PLG": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-B5MIN-HARD-RIV": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-B5MIN-HARD-SCA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-B5MIN-HARD-WDI": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-B5MIN-HARD-WIT": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-B5MIN-HARD-WDL": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-B5MIN-PAPER-CHB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-B5MIN-PAPER-MOS": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-B5MIN-PAPER-RIV": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-B5MIN-PAPER-SCA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DUO-CLOTH-AUT": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DUO-CLOTH-CHB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DUO-CLOTH-ENF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DUO-CLOTH-FWN": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DUO-CLOTH-MOS": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DUO-CLOTH-RIV": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DUO-CLOTH-SCA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DUO-HARD-AUT": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DUO-HARD-BLF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DUO-HARD-WCHB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DUO-HARD-ENF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DUO-HARD-FWN": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DUO-HARD-MOS": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DUO-HARD-RIV": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DUO-HARD-SCA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DUO-HARD-WDI": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DUO-HARD-WIT": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DUO-HARD-WDL": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DUO-PAPER-CHB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DUO-PAPER-MOS": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "22026Q4-DUO-PAPER-RIV": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DUO-PAPER-SCA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DAILY-CLOTH-AUT": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DAILY-CLOTH-CHB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DAILY-CLOTH-ENF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DAILY-CLOTH-FWN": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DAILY-CLOTH-MOS": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DAILY-CLOTH-RIV": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DAILY-CLOTH-SCA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DAILY-HARD-AUT": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DAILY-HARD-BLF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DAILY-HARD-CHB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DAILY-HARD-ENF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DAILY-HARD-FWN": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DAILY-HARD-MOS": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DAILY-HARD-PLG": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DAILY-HARD-RIVv": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DAILY-HARD-SCA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DAILY-HARD-WDI": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DAILY-HARD-WIT": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DAILY-HARD-WDL": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DAILY-PAPER-ENF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DAILY-PAPER-MOS": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DAILY-PAPER-RIV": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-DAILY-PAPER-SCA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-HOR-CLOTH-AUT": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-HOR-CLOTH-CHB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-HOR-CLOTH-ENF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-HOR-CLOTH-FWN": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-HOR-CLOTH-MOS": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-HOR-CLOTH-RIV": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-HOR-CLOTH-SCA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-HOR-HARD-AUT": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-HOR-HARD-BLF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-HOR-HARD-CHB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-HOR-HARD-ENF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-HOR-HARD-FWN": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-HOR-HARD- MOS": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-HOR-HARD-PLG": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-HOR-HARD-RIV": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-HOR-HARD-SCA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-HOR-HARD-WDI": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-HOR-HARD-WIT": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-HOR-HARD-WDL": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-HOR-PAPER-CHB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-HOR-PAPER-MOS": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-HOR-PAPER-RIV": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-HOR-PAPER-SCA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "26-PLNR-BNDL-AUT-AC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "26-PLNR-BNDL-AUT-AA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "26-PLNR-BNDL-AUT": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "26-PLNR-BNDL-AUT-AB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "26-PLNR-BNDL-CHB-AC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "26-PLNR-BNDL-CHB-AA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "26-PLNR-BNDL-CHB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "26-PLNR-BNDL-CHB-AB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "26-PLNR-BNDL-ECF-AC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "26-PLNR-BNDL-ECF-AA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "26-PLNR-BNDL-ECF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "26-PLNR-BNDL-ECF-AB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "26-PLNR-BNDL-FWN-AC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "26-PLNR-BNDL-FWN-AA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "26-PLNR-BNDL-FWN": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "26-PLNR-BNDL-FWN-AB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "26-PLNR-BNDL-MOS-AC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "26-PLNR-BNDL-MOS-AA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "26-PLNR-BNDL-MOS": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "26-PLNR-BNDL-MOS-AB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "26-PLNR-BNDL-RIV-AC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "26-PLNR-BNDL-RIV-AA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "26-PLNR-BNDL-RIV": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "26-PLNR-BNDL-RIV-AB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "26-PLNR-BNDL-OAK-AC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "26-PLNR-BNDL-OAK-AA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "26-PLNR-BNDL-OAK": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "26-PLNR-BNDL-OAK-AB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "26-PLNR-BNDL-WIN-AC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "26-PLNR-BNDL-WIN-AA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "26-PLNR-BNDL-WIN": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "26-PLNR-BNDL-WIN-AB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "26-PLNR-BNDL-WDL-AC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "26-PLNR-BNDL-WDL-AA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "26-PLNR-BNDL-WDL": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "26-PLNR-BNDL-WDL-AB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-COMBO-CLOTH-AUT": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-COMBO-CLOTH-CHB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-COMBO-CLOTH-ENF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-COMBO-CLOTH-FWN": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-COMBO-CLOTH-MOS": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-COMBO-CLOTH-RIV": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-COMBO-CLOTH-SCA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-COMBO-HARD-AUT": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-COMBO-HARD-BLF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-COMBO-HARD-CHB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-COMBO-HARD-ENF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-COMBO-HARD-FWN": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-COMBO-HARD-MOS": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-COMBO-HARD-PLG": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-COMBO-HARD-RIV": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-COMBO-HARD-SCA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-COMBO-HARD-WDI": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-COMBO-HARD-WIT": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-COMBO-HARD-WDL": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-COMBO-PAPER-CHB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-COMBO-PAPER-MOS": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-COMBO-PAPER-RIV": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-COMBO-PAPER-SCA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-WEEKLY-CLOTH-AUT": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-WEEKLY-CLOTH-CHB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-WEEKLY-CLOTH-ENF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-WEEKLY-CLOTH-FWN": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-WEEKLY-CLOTH-MOS": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-WEEKLY-CLOTH-RIV": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-WEEKLY-CLOTH-SCA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-WEEKLY-HARD-AUT": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-WEEKLY-HARD-BLF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-WEEKLY-HARD-CHB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-WEEKLY-HARD-ENF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-WEEKLY-HARD-FWN": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-WEEKLY-HARD-MOS": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-WEEKLY-HARD-PLG": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-WEEKLY-HARD-RIV": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-WEEKLY-HARD-SCA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-WEEKLY-HARD-WDI": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-WEEKLY-HARD-WIT": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-WEEKLY-HARD-WDL": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-WEEKLY-PAPER-CHB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-WEEKLY-PAPER-MOS": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-WEEKLY-PAPER-RIV": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "2026Q4-WEEKLY-PAPER-SCA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "NTB-AST-BLNK": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DEE-BLNK": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-MAR-BLNK": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-ROS-BLNK": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-SEC-BLNK": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-WHI-BLNK": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-WIS-BLNK": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "INS-CL-BLNK-DIS": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INS-DB-HL-BLNK-DIS": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INS-A5-BLNK-RIN": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "NTB-DOT-DAH-AC": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-A5-DAH": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-DAH-AA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-A5-DAH-AA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-DAH": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-A5-DAH-AB": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-DAH-AB": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-A5-DAH-AC": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "JWL-14K-EAR-GLD-14": {
        "description": "Sterling silver jewellery earrings",
        "tariffNo": "7113115000",
        "country": "CA"
    },
    "JWL-CMS-EAR-GLD-14": {
        "description": "Sterling silver jewellery earrings",
        "tariffNo": "7113115000",
        "country": "CA"
    },
    "DOT-FWN-HA5-CUR": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-MON-HA5-CUR": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-RIV-HA5-CUR": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-FWN-HB5-RAB": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "DOT-RIV-HB5-RAB": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "DOT-FWN-HTN-RAB": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-MON-HTN-RAB": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-RIV-HTN-RAB": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-FWN-HA5-CUR70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-MON-HA5-CUR70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-RIV-HA5-CUR70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-FWN-HA5-CUR-2": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-MON-HA5-CUR-2": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-RIV-HA5-CUR-2": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-FWN-HB5-RAB-2": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "GRP-RIV-HB5-RAB-2": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "GRP-FWN-HTN-RAB-2": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-MON-HTN-RAB-2": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-RIV-HTN-RAB-2": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-FWN-HA5-CUR70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-MON-HA5-CUR70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-RIV-HA5-CUR70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-FWN-HA5-CUR": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-MON-HA5-CUR": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-RIV-HA5-CUR": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-FWN-HA5-CUR": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-MON-HA5-CUR": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-RIV-HA5-CUR": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-FWN-HB5-RAB": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "GRP-RIV-HB5-RAB": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "GRP-FWN-HTN-RAB": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-MON-HTN-RAB": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-RIV-HTN-RAB": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NP-DN": {
        "description": "Notepad",
        "tariffNo": "4820102020",
        "country": "CA"
    },
    "WK-DEF-AB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "DOT-AUT-CFX": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-CHB-CFX": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-AST-CFX": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-ENF-CFX": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-FAW-CFX": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-MON-CFX": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-MOS-CFX": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-RIV-CFX": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-SCO-CFX": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-AUT-CF7": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-CHB-CF7": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-AST-CF7": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-ENF-CF7": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-FWN-CF7": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-MON-CF7": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-MOS-CF7": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-RIV-CF7": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-SCO-CF7": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-AUT-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-BLF-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-BTC-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-CHB-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-AST-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-ENF-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-FAW-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-MON-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-MOS-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-PLG-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-RIV-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-SCO-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-SNP-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-WDI-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-WDL-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-AUT-HB5": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "DOT-BLF-HB5": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "DOT-CHB-HB5": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "DOT-ENF-HB5": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "DOT-FAW-HB5": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "DOT-MOS-HB5": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "DOT-RIV-HB5": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "DOT-SCO-HB5": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "DOT-WDI-HB5": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "DOT-WDL-HB5": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "DNT-BLF-HTN": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DNT-BTC-HTN": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DNT-CHB-HTN": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DNT-ENF-HTN": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DNT-FAW-HTN": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DNT-MON-HTN": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DNT-MOS-HTN": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DNT-RIV-HTN": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DNT-SNP-HTN": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DNT-WDL-HTN": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-AUT-H70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-BLF-H70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-BTC-H70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-CHB-H70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-AST-H70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-ENF-H70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-FWN-H70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-MON-H70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-MOS-H70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-RIV-H70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-SCO-H70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-SNP-H70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-WDI-H70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-WDL-H70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-CHB-P15": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-MOS-P15": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-RIV-P15": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-SCA-P15": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-CHB-PF7": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-MOS-PF7": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-RIV-PF7": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-SCA-PF7": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NP-DO": {
        "description": "Notepad",
        "tariffNo": "4820102020",
        "country": "CA"
    },
    "INS-CL-DOT-DIS": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INS-DB-HL-DOT-DIS": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INS-A5-DOT-RIN": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "STK-HDR": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "STK-LKS": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "STK-SPN": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "STK-FIN-SMT": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "NBD-SP-24-A5-DA-FLR": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-B5-DA-FLR": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NBD-SP-24-TN-DA-FLR": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-A5-JP-FLR": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-B5-JP-FLR": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NBD-SP-24-TN-JP-FLR": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-A5-PF-FLR": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-B5-PF-FLR": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NBD-SP-24-TN-PF-FLR": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-A5-SL-FLR": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-B5-SL-FLR": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NBD-SP-24-TN-SL-FLR": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-A5-WO-FLR": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-B5-WO-FLR": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NBD-SP-24-TN-WO-FLR": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-A5-WL-FLR": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-B5-WL-FLR": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NBD-SP-24-TN-WL-FLR": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-A5-DAH-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-A5-JUN-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-A5-PAC-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-A5-WOR-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-A5-WOR-IM-AA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-A5-WIL-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-B5-DAH-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-B5-DAH-IM-AA": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-DOT-B5-JUN-IM": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-DOT-B5-PAC-IM": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-DOT-B5-WOR-IM": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-DOT-B5-WIL-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-TN-DAH-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-TN-JUN-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-TN-PAC-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-TN-WOR-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-TN-WOR-IM-AA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-TN-WIL-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NB-DEE-A-GPH": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NB-JUN-A-GPH": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NB-PAC-A-GPH": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NB-SLA-A-GPH": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NB-WIL-A-GPH": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-WIL-AB": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NB-DEE-B-GPH": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NB-JUN-B-GPH": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NB-PAC-B-GPH": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NB-SLA-B-GPH": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NB-WIL-B-GPH": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-GRD-WIL-AC": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NB-DEE-TN-GPH": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NB-JUN-TN-GPH": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NB-PAC-TN-GPH": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NB-SLA-TN-GPH": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NB-WIL-TN-GPH": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-WIL": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-A5-JUN-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-A5-PAC-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-A5-PAC-IM-AA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-A5-WOR-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-A5-WOR-IM-AB": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-A5-WOR-IM-AA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-A5-WIL-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-B5-DAH-IM": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-GRD-B5-JUN-IM": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-GRD-B5-PAC-IM": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-GRD-B5-WOR-IM": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-GRD-B5-WIL-IM": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-GRD-TN-DAH-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-TN-JUN-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-TN-PAC-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-TN-WOR-IM-AA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-TN-WOR-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "FR-TRNSPKT": {
        "description": "",
        "tariffNo": "",
        "country": "CA"
    },
    "GFT-10": {
        "description": "",
        "tariffNo": "",
        "country": "CA"
    },
    "GC-100": {
        "description": "",
        "tariffNo": "",
        "country": "CA"
    },
    "GC-125": {
        "description": "",
        "tariffNo": "",
        "country": "CA"
    },
    "GFT-15": {
        "description": "",
        "tariffNo": "",
        "country": "CA"
    },
    "GC-150": {
        "description": "",
        "tariffNo": "",
        "country": "CA"
    },
    "GC-200": {
        "description": "",
        "tariffNo": "",
        "country": "CA"
    },
    "GFT-25": {
        "description": "",
        "tariffNo": "",
        "country": "CA"
    },
    "GFT-5": {
        "description": "",
        "tariffNo": "",
        "country": "CA"
    },
    "GC-50": {
        "description": "",
        "tariffNo": "",
        "country": "CA"
    },
    "GC-75": {
        "description": "",
        "tariffNo": "",
        "country": "CA"
    },
    "INS-A5-A5X": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INS-CL-CLA": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INS-HL-HAL": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "GRP-AUT-CF7": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-CHB-CF7": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-AST-CF7": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-ENF-CF7": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-FWN-CF7": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-MON-CF7": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-MOS-CF7": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-RIV-CF7": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-SCO-CF7": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-AUT-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-BLF-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-BTC-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-CHB-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-AST-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-ENF-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-FWN-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-MON-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-MOS-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-RIV-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-SCO-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-SNP-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-WDL-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-AUT-HB5": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "GRP-BLF-HB5": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "GRP-CHB-HB5": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "GRP-ENF-HB5": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "GRP-FWN-HB5": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "GRP-MOS-HB5": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "GRP-RIV-HB5": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "GRP-SCO-HB5": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "GRP-WDI-HB5": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "GRP-WDL-HB5": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "GNT-BLF-HTN": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GNT-BTC-HTN": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GNT-CHB-HTN": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GNT-ENF-HTN": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GNT-FWN-HTN": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GNT-MON-HTN": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GNT-MOS-HTN": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GNT-RIV-HTN": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GNT-SNP-HTN": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GNT-WDL-HTN": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-AUT-H70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-BLF-H70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-BTC-H70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-CHB-H70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-AST-H70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-ENF-H70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-FWN-H70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-MON-H70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-MOS-H70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-RIV-H70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-SCO-H70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-SNP-H70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-WDI-H70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-WDL-H70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-CHB-PF7": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-MOS-PF7": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-RIV-PF7": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-FWN-PF7": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NP-BN": {
        "description": "Notepad",
        "tariffNo": "4820102020",
        "country": "CA"
    },
    "INS-HPC-GP": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INS-HL-GP": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INS-A5-GP": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INSWKS-CLHP-25-SS": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INSWKS-HL-25-SS": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INSWKS-A5-25-SS": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "STCK-HABIT": {
        "description": "Sticky notepad",
        "tariffNo": "4820102020",
        "country": "CA"
    },
    "STCK-HABIT-2": {
        "description": "Sticky notepad",
        "tariffNo": "4820102020",
        "country": "CA"
    },
    "DOT-BLF-HA5-HOF": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-ENF-HA5-HOF": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-WDL-HA5-HOF": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-BLF-HB5-HOF": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "DOT-ENF-HB5-HOF": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "DOT-WDL-HB5-HOF": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "DOT-BLF-HTN-HOF": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-ENF-HTN-HOF": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-WDL-HTN-HOF": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-BLF-HA5-HOF70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-ENF-HA5-HOF70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-WDL-HA5-HOF70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-BLF-HA5-HOF": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-ENF-HA5-HOF": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-WDL-HA5-HOF": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-BLF-HB5-HOF": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "GRP-ENF-HB5-HOF": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "GRP-WDL-HB5-HOF": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "GRP-BLF-HTN-HOF": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-ENF-HTN-HOF": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-WDL-HTN-HOF": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-LIN-A5-ECF": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-LIN-A5-WDL": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "JWL-14K-BRC-GLD-14": {
        "description": "Sterling silver jewellery bracelet",
        "tariffNo": "7113115000",
        "country": "CA"
    },
    "BRC-MED-GLP": {
        "description": "Sterling silver jewellery bracelet",
        "tariffNo": "7113115000",
        "country": "CA"
    },
    "JWL-HLC-BRC-GLD-14": {
        "description": "Sterling silver jewellery bracelet",
        "tariffNo": "7113115000",
        "country": "CA"
    },
    "JWL-SIL-BRC-SLV-AB": {
        "description": "Sterling silver jewellery bracelet",
        "tariffNo": "7113115000",
        "country": "CA"
    },
    "JWL-SIL-BRC-SLV-AA": {
        "description": "Sterling silver jewellery bracelet",
        "tariffNo": "7113115000",
        "country": "CA"
    },
    "JWL-SIL-BRC-SLV": {
        "description": "Sterling silver jewellery bracelet",
        "tariffNo": "7113115000",
        "country": "CA"
    },
    "BRC-SML-GLP-4": {
        "description": "Sterling silver jewellery earrings",
        "tariffNo": "7113115000",
        "country": "CA"
    },
    "BRC-SML-GLP-3": {
        "description": "Sterling silver jewellery earrings",
        "tariffNo": "7113115000",
        "country": "CA"
    },
    "PEN-ALUMINUM": {
        "description": "Gel ink pen",
        "tariffNo": "9608100000",
        "country": "CA"
    },
    "PEN-BRASS": {
        "description": "Gel ink pen",
        "tariffNo": "9608100000",
        "country": "CA"
    },
    "AC-HI-AUT": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "AC-HI-LR": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "AC-HI-MA": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "AC-HI-DAS": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "STK-HLT-DPO": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "AC-HI-FE": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "STK-HLT-FWN": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "STK-HLT-MRG": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "AC-HI-MO": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "AC-HI-MOS": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "AC-HI-NIM": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "AC-HI-ELB": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "AC-HI-RI": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "STK-HLT-OAK": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "STK-HLT-SNP": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "AC-HI-TDL": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "AC-HI-LI": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "AC-HI-WO": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "STK-HLT": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "JWL-HUM-EAR-PR-AA": {
        "description": "Sterling silver jewellery earrings",
        "tariffNo": "7113115000",
        "country": "CA"
    },
    "JWL-HUM-EAR-SN-AA": {
        "description": "Sterling silver jewellery earrings",
        "tariffNo": "7113115000",
        "country": "CA"
    },
    "DOT-RIV-HA5-HUM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-WDI-HA5-HUM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-RIV-HB5-HUM": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "DOT-WDI-HB5-HUM": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "DOT-RIV-HA5-HUM70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-WDI-HA5-HUM70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-RIV-HA5-HUM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-RIV-HB5-HUM": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "GRP-WDI-HB5-HUM": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "GRP-RIV-HA5-HUM70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-WDI-HA5-HUM70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-RIV-HA5-HUM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-WDI-HA5-HUM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "JWL-HUM-EAR-PR": {
        "description": "Sterling silver jewellery earrings",
        "tariffNo": "7113115000",
        "country": "CA"
    },
    "JWL-HUM-EAR-SN": {
        "description": "Sterling silver jewellery earrings",
        "tariffNo": "7113115000",
        "country": "CA"
    },
    "HYDR-DEF": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "DAI-ENC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WKP-UND-CHB-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WKP-UND-ECF-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WKP-UND-ECF-IM-AA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WKP-UND-FWN-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WKP-UND-MNF-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WKP-UND-MOS-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WKP-UND-MOS-IM-AA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WKP-UND-RIV-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "NTB-DOT-A5-PLG-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-A5-WIN-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-TN-SNP-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-TN-SNP-IM-AA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-TN-WDL-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-A5-SCA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-A5-SCA-AB": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-A5-SNA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-B5-AUT": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "GRP-B5-CHA-AC": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "GRP-TN-SNA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-B5-ENC": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-GRD-B5-ECF-IM": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-GRD-B5-WDL-IM": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-LIN-A5-ECF-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-LIN-A5-WDL-IM": {
        "description": "Notepad",
        "tariffNo": "4820102020",
        "country": "CA"
    },
    "DOT-A5-WIL": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-A5-WIL-AB": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-A5-RIV": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-LIN-A5-RIV-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-LIN-A5-WIN-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-A5-MOO": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-A5-SNA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-B5-CHA": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "DOT-B5-MOS": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-GRD-B5-FWN-IM": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-GRD-TN-FWN-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-A5-MOS": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-TN-BLO": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "IMP-DOT-ENC-A5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "IMP-DOT-WOO-A5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-A5-WOO": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-A5-WOO-AB": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-B5-CHA-AB": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "DLP-UND-OAK-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "DLP-UND-WDL-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WKP-UND-AUT-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WKP-UND-AUT-IM-AA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WKP-UND-BLO-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WKP-UND-BLO-IM-AA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WKP-UND-BTR-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WKP-UND-CHB-IM-AA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WKP-UND-ECF-IM-AB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WKP-UND-FWN-IM-AA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WKP-UND-MNF-IM-AA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WKP-UND-MOS-IM-AB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WKP-UND-RIV-IM-AA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WKP-UND-OAK-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WKP-UND-SNP-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WKP-UND-WIN-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WKP-UND-WIN-IM-AA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WKP-UND-WDL-IM": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WKP-UND-AUT-IM-AB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WKP-UND-BLO-IM-AB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WKP-UND-BTR-IM-AA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WKP-UND-CHB-IM-AB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WKP-UND-CHB-IM-AC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WKP-UND-ECF-IM-AC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WKP-UND-FWN-IM-AB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WKP-UND-MNF-IM-AB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WKP-UND-MOS-IM-AC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WKP-UND-RIV-IM-AB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WKP-UND-OAK-IM-AA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WKP-UND-SNP-IM-AA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WKP-UND-WIN-IM-AB": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WKP-UND-WIN-IM-AC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WKP-UND-WDL-IM-AA": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WK-RIV-AD": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WK-MOS-AE": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "NTB-BLNK-AST-AA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-BLNK-DPF-AA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-BLNK-MRG-AA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-BLNK-RWO-AA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-BLNK-SCG-AA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-BLNK-WOK-AA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-BLNK-WIS-AA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-BLNK-AST-IM-AB": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-BLNK-AST-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-BLNK-DPF-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-BLNK-MRG-IM-AA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-BLNK-RWO-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-BLNK-SCG-IM-AC": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-BLNK-SCG-IM-AD": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-BLNK-SCG-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-BLNK-WOK-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-BLNK-WIS-IM-AA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-AUT-CFX": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-CHB-CFX": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-AST-CFX": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-ENF-CFX": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-FWN-CFX": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-MON-CFX": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-MOS-CFX": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-RIV-CFX": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-SCO-CFX": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-AUT-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-BLF-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-BTC-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-CHB-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-AST-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-ENF-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-FWN-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-MON-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-MOS-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-RIV-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-SCO-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-SNP-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-WDI-HA5L": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-WDL-HA5": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-CHB-PFX": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-MOS-PFX": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-RIV-PFX": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-SCA-PFX": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NP-LI": {
        "description": "Notepad",
        "tariffNo": "4820102020",
        "country": "CA"
    },
    "LIST-DEF": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "NTB-BLNK-AST": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-BLNK-DPF": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-BLNK-MRG": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-BLNK-RWO": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-BLNK-SCG": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-BLNK-WOK": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-BLNK-WIS": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-BLNK-AST-IM-AA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-BLNK-DPF-IM-AA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-BLNK-MRG-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-BLNK-RWO-IM-AA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-BLNK-SCG-IM-AB": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-BLNK-SCG-IM-AA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-BLNK-SCG-IM-AE": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-BLNK-WOK-IM-AA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-BLNK-WIS-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-A5-DA-LMN": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-B5-DA-LMN": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-DOT-DAH-AD": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-A5-JP-LMN": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-B5-JP-LMN": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NBD-SP-24-TN-JP-LMN": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-A5-PF-LMN": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-B5-PF-LMN": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NBD-SP-24-TN-PF-LMN": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-A5-SL-LMN": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-B5-SL-LMN": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NBD-SP-24-TN-SL-LMN": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-A5-WO-LMN": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-B5-WO-LMN": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NBD-SP-24-TN-WO-LMN": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-A5-WL-LMN": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-B5-WL-LMN": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NBD-SP-24-TN-WL-LMN": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-JUN-IM-AB": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-PAC-IM-AB": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-PAC-IM-AC": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-WOR-IM-AB": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-WIL-IM-AC": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-DAH-IM-AC": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-DOT-JUN-IM-AC": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-DOT-PAC-IM-AA": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-DOT-PAC-IM-AD": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-DOT-SLA-IM": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-DOT-WOR-IM-AC": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-DOT-WIL-IM-AD": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-DOT-DAH-IM-AD": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-DAH-IM-AE": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-JUN-IM-AD": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-JUN-IM-AE": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-PAC-IM-AE": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-SLA-IM-AA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-WOR-IM-AD": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-WIL-IM-AE": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NB-DEE-AX-GPH": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NB-JUN-AX-GPH": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NB-PAC-AX-GPH": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-SLA-AB": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NB-WIL-AX-GPH": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-WIL-AF": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-DAH-AB": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NB-JUN-BX-GPH": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NB-PAC-BX-GPH": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-GRD-SLA-AC": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NB-WIL-BX-GPH": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-GRD-WIL-AH": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-GRD-DAH-AA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NB-JUN-TNX-GPH": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NB-PAC-TNX-GPH": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-SLA-AA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NB-WIL-TNX-GPH": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-WIL-AD": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-DAH-IM-AC": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-JUN-IM-AC": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-WOR-IM-AB": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-WOR-IM-AF": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-WIL-IM-AE": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-DAH-IM-AA": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-GRD-JUN-IM-AB": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-GRD-PAC-IM-AB": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-GRD-WOR-IM-AD": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-GRD-WOR-IM-AE": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-GRD-WIL-IM-AD": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-GRD-WIL-IM-AC": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-GRD-DAH-IM-AB": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-JUN-IM-AE": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-PAC-IM-AC": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-PAC-IM-AD": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-SLA-IM-AB": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-WOR-IM-AC": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-WIL-IM-AB": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-JUN-IM-AG": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-PAC-IM-AF": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-WOR-IM-AF": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-WIL-IM-AF": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-DAH-IM-AG": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-DOT-JUN-IM-AF": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-DOT-PAC-IM-AH": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-DOT-SLA-IM-AB": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-DOT-WOR-IM-AE": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-DOT-WOR-IM-AI": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-DOT-WOR-IM-AG": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-DOT-WOR-IM-AH": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-DOT-WIL-IM-AG": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-DOT-DAH-IM-AF": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-PAC-IM-AI": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-PAC-IM-AG": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-SLA-IM-AC": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-WOR-IM-AJ": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-JUN-IM-AG": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-IM-AA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-PAC-IM-AG": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-SLA-IM-AC": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-WOR-IM-AH": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-WOR-IM-AI": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-WIL-IM-AF": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-DAH-IM-AD": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-GRD-JUN-IM-AF": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-GRD-JUN-IM-AH": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-GRD-PAC-IM-AE": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-GRD-WOR-IM-AJ": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-GRD-WOR-IM-AK": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-GRD-WIL-IM-AG": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-GRD-JUN-IM-AD": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-WOR-IM-AG": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-PAC-IM-AF": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-B5-LUN-DA": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NBD-SP-24-TN-LUN-DA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-A5-LUN-JP": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-B5-LUN-JP": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-TN-LUN-JP": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-A5-LUN-PA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-B5-LUN-PA": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NBD-SP-24-TN-LUN-PA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-A5-LUN-SL": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-B5-LUN-SL": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NBD-SP-24-TN-LUN-SL": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-A5-LUN-WO": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-B5-LUN-WO": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NBD-SP-24-TN-LUN-WO": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-A5-LUN-WL": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-B5-LUN-WL": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NBG-SP-24-TN-LUN-WL": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NB-DEE-BX-GPH": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NB-DEE-TNX-GPH": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-JUN-AB": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-JUN-AC": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-GRD-JUN-AA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-PAC-AB": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-PAC-AC": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-GRD-PAC-AA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NB-SLA-AX-GPH": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NB-SLA-BX-GPH": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NB-SLA-TNX-GPH": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-WOR-AA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-WOR-AB": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-GRD-WOR": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-WIL-AG": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-WIL-AI": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-GRD-WIL-AE": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "JWL-LNR-BRC-GLD-14AA": {
        "description": "Sterling silver jewellery bracelet",
        "tariffNo": "7113115000",
        "country": "CA"
    },
    "JWL-LNR-BRC-GLD-AB": {
        "description": "Sterling silver jewellery bracelet",
        "tariffNo": "7113115000",
        "country": "CA"
    },
    "JWL-LNR-BRC-SLV-AB": {
        "description": "Sterling silver jewellery bracelet",
        "tariffNo": "7113115000",
        "country": "CA"
    },
    "JWL-LNR-BRC-GLD-14AB": {
        "description": "Sterling silver jewellery bracelet",
        "tariffNo": "7113115000",
        "country": "CA"
    },
    "JWL-LNR-BRC-GLD-AA": {
        "description": "Sterling silver jewellery bracelet",
        "tariffNo": "7113115000",
        "country": "CA"
    },
    "JWL-LNR-BRC-SLV-AA": {
        "description": "Sterling silver jewellery bracelet",
        "tariffNo": "7113115000",
        "country": "CA"
    },
    "JWL-LNR-BRC-GLD-14": {
        "description": "Sterling silver jewellery bracelet",
        "tariffNo": "7113115000",
        "country": "CA"
    },
    "JWL-LNR-BRC-GLD": {
        "description": "Sterling silver jewellery bracelet",
        "tariffNo": "7113115000",
        "country": "CA"
    },
    "JWL-LNR-BRC-SLV": {
        "description": "Sterling silver jewellery bracelet",
        "tariffNo": "7113115000",
        "country": "CA"
    },
    "STCK-WF-MOON": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "NBD-SP-24-A5-DA-MRQ": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-B5-DA-MRQ": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NBD-SP-24-TN-DA-MRQ": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-A5-JP-MRQ": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-B5-JP-MRQ": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NBD-SP-24-TN-JP-MRQ": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-A5-PF-MRQ": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-B5-PF-MRQ": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NBD-SP-24-TN-PF-MRQ": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-A5-SL-MRQ": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-B5-SL-MRQ": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NBD-SP-24-TN-SL-MRQ": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-A5-WO-MRQ": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-B5-WO-MRQ": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NBD-SP-24-TN-WO-MRQ": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-A5-WL-MRQ": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NBD-SP-24-B5-WL-MRQ": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NBD-SP-24-TN-WL-MRQ": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-DAH-IM-AB": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-WOR-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-WOR-IM-AA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-WIL-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-WIL-IM-AA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-DAH-IM-AA": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-DOT-DAH-IM": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-DOT-JUN-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-DOT-PAC-IM": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-DOT-WOR-IM-AL": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-DOT-WOR-IM-AK": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-DOT-WIL-IM-AB": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-DOT-JUN-IM-AA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NB-DEE-A5-GPH": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NB-JUN-A5-GPH": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NB-PAC-A5-GPH": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NB-SLA-A5-GPH": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NB-WIO-A5-GPH": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NB-WIL-A5-GPH": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NB-DEE-B5-GPH": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NB-JUN-B5-GPH": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NB-PAC-B5-GPH": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NB-SLA-B5-GPH": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NB-WIO-B5-GPH": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NB-WIL-B5-GPH": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-GRD-DAH": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-JUN": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-PAC": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-SLA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NB-WIO-TN-GPH": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-WIL-AA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-JUN-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-WOR-IM-AL": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-WOR-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-WIL-IM-AH": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-JUN-IM-AA": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-GRD-PAC-IM-AA": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-GRD-SLA-IM-AA": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-GRD-WOR-IM-AA": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-GRD-WIL-IM-AA": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "NTB-GRD-DAH-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-PAC-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-SLA-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-WIL-IM": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "JWL-MON-EAR-PR": {
        "description": "Sterling silver jewellery earrings",
        "tariffNo": "7113115000",
        "country": "CA"
    },
    "JWL-MON-EAR-SN": {
        "description": "Sterling silver jewellery earrings",
        "tariffNo": "7113115000",
        "country": "CA"
    },
    "MTH-AUT-25": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "AC-TB-EB-24": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "MTH-BCP-25": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "AC-TB-CH-24": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "MNT-ELD-25": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "AC-TB-EF-24": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "MTB-FAW-25": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "AC-TB-LI-24": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "AC-TB-AU-24": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "MNT-MFL-25": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "AC-TB-MO-24": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "AC-TB-NI-24": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "MNT-PLG-25": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "MTH-RIV-25": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "STK-TAB-RWO": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "MNT-SCA-25": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "MNT-SNP-25": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "AC-TB-TL-24": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "MNT-WIN-25": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "AC-TB-WO-24": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "STK-TAB-WIS": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "STK-TAB-WDL": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "JWL-LAR-BRC-GLD-14": {
        "description": "Sterling silver jewellery bracelet",
        "tariffNo": "7113115000",
        "country": "CA"
    },
    "JWL-LAR-BRC-GLD": {
        "description": "Sterling silver jewellery bracelet",
        "tariffNo": "7113115000",
        "country": "CA"
    },
    "JWL-LAR-BRC-SLV": {
        "description": "Sterling silver jewellery bracelet",
        "tariffNo": "7113115000",
        "country": "CA"
    },
    "BRC-MED-SGP": {
        "description": "Sterling silver jewellery bracelet",
        "tariffNo": "7113115000",
        "country": "CA"
    },
    "JWL-MED-BRC-GLD": {
        "description": "Sterling silver jewellery bracelet",
        "tariffNo": "7113115000",
        "country": "CA"
    },
    "JWL-MED-BRC-SLV": {
        "description": "Sterling silver jewellery bracelet",
        "tariffNo": "7113115000",
        "country": "CA"
    },
    "BRC-SML-GLP": {
        "description": "Sterling silver jewellery bracelet",
        "tariffNo": "7113115000",
        "country": "CA"
    },
    "JWL-SMA-BRC-GLD": {
        "description": "Sterling silver jewellery bracelet",
        "tariffNo": "7113115000",
        "country": "CA"
    },
    "JWL-SMA-BRC-SLV": {
        "description": "Sterling silver jewellery bracelet",
        "tariffNo": "7113115000",
        "country": "CA"
    },
    "DOT-CHA-HA5-MFL": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-WIT-HA5-MFL": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-CHB-HB5-PHASE": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "DOT-WIT-HB5-PHASE": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "DOT-CHB-HTN-PHASE": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "DOT-CHB-HTN-PHASE-2": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-CHA-HA5-MFL70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-WIT-HA5-MFL70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-CHA-HA5-MNF-2": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-WIT-HA5-MNF-2": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-CHB-HB5-PHASE-2": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "GRP-WIT-HB5-PHASE-2": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "GRP-CHB-HTN-PHASE-2": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-CHA-HA5-MFL70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-WIT-HA5-MFL70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-CHA-HA5-MNF": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-WIT-HA5-MNF": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-CHB-HB5-PHASE": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "GRP-WIT-HB5-PHASE": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "GRP-CHB-HTN-PHASE": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-CHA-HA5-MNF": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-WIT-HA5-MNF": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-CHA-HA5-MRS": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-WIT-HA5-MRS": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-CHB-HB5-MOON": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "DOT-WIT-HB5-MOON": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "DOT-CHB-HTN-MOON": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-CHA-HA5-MRS70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-WIT-HA5-MRS70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-CHA-HA5-MRS": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-WIT-HA5-MRS": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-CHB-HB5-MOON": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "GRP-WIT-HB5-MOON": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "GRP-CHB-HTN-MOON": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-CHA-HA5-MRS70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-WIT-HA5-MRS70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-CHA-HA5-MRS": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-WIT-HA5-MRS": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-FWN-HA5-MUS": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-MOS-HA5-MUS": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-SCA-HA5-MUS": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-FWN-HB5-MUSH": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "DOT-MOS-HB5-MUSH": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "DOT-SCO-HB5-MUSH": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "DOT-FWN-HTN-MUSH": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-MOS-HTN-MUSH": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-FWN-HA5-MUS70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-MOS-HA5-MUS70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-SCA-HA5-MUS70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-FWN-HA5-MUS": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-MOS-HA5-MUS": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-SCA-HA5-MUS": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-FWN-HB5-MUSH": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "GRP-MOS-HB5-MUSH": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "GRP-SCO-HB5-MUSH": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "GRP-FWN-HTN-MUSH": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-MOS-HTN-MUSH": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-FWN-HA5-MUS70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-MOS-HA5-MUS70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-SCA-HA5-HOF70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-FWN-HA5-MUS": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-MOS-HA5-MUS": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-SCA-HA5-MUS": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DLP-UND-BLO": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "DEF": {
        "description": "Notepad",
        "tariffNo": "4820102020",
        "country": "CA"
    },
    "INS-DB-CL-DIS": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INS-HL-PG": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INS-A5-PG": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "NP-PF": {
        "description": "Notepad",
        "tariffNo": "4820102020",
        "country": "CA"
    },
    "DOT-BSM-HA5-ROG": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-WIN-HA5-ROG": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-BLF-HB5-ROG": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "DOT-WDI-HB5-ROG": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "DOT-BLF-HTN-ROG": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-BLF-HA5-ROG70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-WDI-HA5-ROG70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-RIV-HA5-ROG": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-BLF-HB5-ROG": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "GRP-WDI-HB5-ROG": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "GRP-BLF-HTN-ROG": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-BLF-HA5-ROG70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-WDI-HA5-ROG70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-RIV-HA5-ROG": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-WDI-HA5-ROG": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "SHAD-DEF": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "DOT-A5-ENF": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-A5-WDL": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-A5-ECF": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-GRD-A5-WDL": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-LIN-A5-ECF-AA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "NTB-LIN-A5-WDL-AA": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-CHA-HA5-SOL": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-WIT-HA5-SOL": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-CHB-HB5-SOL": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "DOT-WIT-HB5-SOL": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "DOT-CHB-HTN-SOL": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-CHA-HA5-SOL-2": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-WIT-HA5-SOL-2": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-CHA-HA5-SOL": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-WIT-HA5-SOL": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-CHB-HB5-SOL": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "GRP-WIT-HB5-SOL": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "GRP-CHB-HTN-SOL": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-CHA-HA5-SOL70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-WIT-HA5-SOL70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-CHA-HA5-SOL": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-WIT-HA5-SOL": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "STCK-WF-SUN": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "STK-SQB-AUT": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "AC-SM-RO": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "AC-SM-MA": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "STK-SQB-DAH": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "STK-SQB-DPO": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "AC-SM-FE": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "STK-SQB-FWN": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "AC-SM-LI": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "AC-SM-MO": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "STK-SQB-MOS": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "STK-SQB-NIM": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "STK-SQB-PLG": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "AC-SM-RI": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "STK-SQB-RWO": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "STK-SQB-OAK": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "HLS-SNP-25": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "AC-SM-LR": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "STK-SQB-WIN": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "STK-SQB-WOR": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "AC-SM-WI": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "STK-SQB-WDL": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "DOT-CHA-HA5-STL": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-WIT-HA5-STL": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-CHB-HB5-STAR": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "DOT-WIT-HB5-STAR": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "DOT-CHB-HTN-STAR": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-CHA-HA5-STL70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "DOT-WIT-HA5-STL70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-CHA-HA5-STL": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-WIT-HA5-STL": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-CHB-HB5-STAR": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "GRP-WIT-HB5-STAR": {
        "description": "Notebook (sewn journal, B5 size)",
        "tariffNo": "4820102030",
        "country": "CA"
    },
    "GRP-CHB-HTN-STAR": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-CHA-HA5-STL70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "GRP-WIT-HA5-STL70": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-CHA-HA5-STL": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "LIN-WIT-HA5-STL": {
        "description": "Notebook (bound journal)",
        "tariffNo": "4820102060",
        "country": "CA"
    },
    "TASK-DEF": {
        "description": "Sticky notepad",
        "tariffNo": "4820102020",
        "country": "US"
    },
    "TASK-DEF-AB": {
        "description": "Sticky notepad",
        "tariffNo": "4820102020",
        "country": "CA"
    },
    "AC-TM-HY": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "AC-TM-LA": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "TMG-SNT-25": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "STK-TMG-SMT": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "AC-BP": {
        "description": "Notepad",
        "tariffNo": "4820102020",
        "country": "US"
    },
    "INS-HPC-UD": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INS-HL-UD": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INS-A5-UD": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INS-A5-UND-A5X": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INS-CL-UND-CLA": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INS-HL-UND-HAL": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "DPL-CHB-UCF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "DPL-ENF-UCF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "DPL-FWN-UCF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "DPL-MON-UCF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "DPL-MOS-UCF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "DPL-RIV-UCF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "DPL-AUT-UHC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "DPL-BLF-UHC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "DPL-BTC-UHC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "DPL-CHB-UHC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "DPL-ENF-UHC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "DPL-FWN-UHC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "DPL-MON-UHC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "DPL-MOS-UHC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "DPL-RIV-UHC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "DPL-SCA-UHC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "DPL-SNP-UHC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "DPL-WIL-UHC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "DPL-WDL-UHC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "DPL-CHB-UPF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "DPL-MOS-UPF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "DPL-RIV-UPF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "DPL-SCA-UPF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "HPL-CHB-UCF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "HPL-ENF-UCF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "HPL-FWN-UCF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "HPL-MON-UCF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "HPL-MOS-UCF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "HPL-RIV-UCF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "HPL-AUT-UHC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "HPL-BLF-UHC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "HPL-BTC-UHC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "HPL-CHB-UHC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "HPL-ENF-UHC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "HPL-FWN-UHC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "HPL-MON-UHC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "HPL-MOS-UHC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "HPL-RIV-UHC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "HPL-SCA-UHC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "HPL-SNP-UHC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "HPL-WIL-UHC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "HPL-WDL-UHC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "HPL-CHB-UPF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "HPL-MOS-UPF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "HPL-RIV-UPF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "HPL-SCA-UPF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "INS-HPC-UMC": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INS-HL-UMC": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INS-A5-UMC": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "VPL-CHB-UCF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "VPL-ENF-UCF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "VPL-FWN-UCF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "VPL-MON-UCF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "VPL-MOS-UCF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "VPL-RIV-UCF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "VPL-AUT-UHC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "VPL-BLF-UHC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "VPL-BTC-UHC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "VPL-CHB-UHC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "VPL-ENF-UHC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "VPL-FWN-UHC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "VPL-MON-UHC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "VPL-MOS-UHC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "VPL-RIV-UHC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "VPL-SCA-UHC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "VPL-SNP-UHC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "VPL-WIL-UHC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "VPL-WDL-UHC": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "VPL-CHB-UPF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "VPL-MOS-UPF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "VPL-RIV-UPF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "VPL-SCA-UPF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WDP-CHB-UCF7": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WDP-AST-UCF7": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WDP-ENF-UCF7": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WDP-FWN-UCF7": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WDP-MON-UCF7": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WDP-MOS-UCF7": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WDP-RIV-UCF7": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WDP-AUT-UH70": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WDP-BLF-UH70": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WDP-BTC-UH70": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WDP-CHB-UH70": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WDP-AST-UH70": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WDP-ENF-UH70": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WDP-FWN-UH70": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WDP-MON-UH70": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WDP-MOS-UH70": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WDP-RIV-UH70": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WDP-SCA-UH70": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WDP-SNP-UH70": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WDP-WIL-UH70": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WDP-WIT-UH70": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WDP-WDL-UH70": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WDP-CHB-UPF7": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WDP-MOS-UPF7": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WDP-RIV-UPF7": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "WDP-SCA-UPF7": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "INS-HL-UW": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INS-HPC-UW": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "INS-A5-UW": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820900000",
        "country": "CA"
    },
    "UW-SC-23-AR": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "UW-SC-23-DF": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "UW-SC-23-HY": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "UW-SC-23-OK": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "UW-SC-23-SG": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "UW-SC-23-WR": {
        "description": "Planner agenda (bound diary)",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "NP-WT": {
        "description": "Notepad",
        "tariffNo": "4820102010",
        "country": "CA"
    },
    "STCK-WEEK": {
        "description": "Sticky notepad",
        "tariffNo": "4820102020",
        "country": "CA"
    },
    "WNS-HYD-25": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "WNS-LKS-25": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "WNS-SNS-25": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "WNS-SMS-25": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "THRE-THR": {
        "description": "Paper sticker",
        "tariffNo": "4911998000",
        "country": "CA"
    },
    "2025Q4-DAI-NIM": {
        "description": "Planner inserts (loose refills)",
        "tariffNo": "4820102010",
        "country": "CA"
    }
};

    // ============================================================================
    // CONFIGURATION
    // ============================================================================

    const CONFIG = {
        selectors: {
            customsBlock: '.custom-declaration-qQ_1P6U',
            addButton: '.add-declaration-button-uXgAQNY',
            itemRow: '.react-table-body-row-icH4FVD',
            itemSku: '.item-sku-ONq0BTI',
            itemName: '.item-name-E__ZAJW',
            // Input fields within customs declaration
            description: 'input[aria-label="Description"]',
            harmonization: 'input[aria-label="Harmonization"]', // CRITICAL FIX
            itemValue: 'input[aria-label="Item Value(ea)"]',
            quantity: 'input[aria-label="Quantity"]',
            sku: 'input[aria-label="SKU"]'
        },
        delays: {
            input: 100,
            click: 200,
            afterAdd: 500
        },
        autoMode: {
            enabled: false,
            interval: 5000
        }
    };

    // ============================================================================
    // UTILITY FUNCTIONS
    // ============================================================================

    function log(message, type = 'info') {
        const prefix = '[Customs Autofiller]';
        const styles = {
            info: 'color: #0066cc',
            success: 'color: #00cc00',
            error: 'color: #cc0000',
            warn: 'color: #ff9900'
        };
        console.log(`%c${prefix} ${message}`, styles[type] || styles.info);
    }

    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function setInputValue(input, value) {
        if (!input) {
            log('Input element not found', 'error');
            return false;
        }

        // Clear existing value
        input.value = '';
        input.focus();

        // Trigger input event
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            'value'
        ).set;
        nativeInputValueSetter.call(input, value);

        // Trigger React events
        const events = ['input', 'change', 'blur'];
        events.forEach(eventType => {
            const event = new Event(eventType, { bubbles: true });
            input.dispatchEvent(event);
        });

        await wait(CONFIG.delays.input);
        return true;
    }

    async function clickElement(element) {
        if (!element) {
            log('Element not found for clicking', 'error');
            return false;
        }

        element.click();
        await wait(CONFIG.delays.click);
        return true;
    }

    // ============================================================================
    // ITEM DETECTION
    // ============================================================================

    function getOrderItems() {
        const items = [];
        const itemRows = document.querySelectorAll(CONFIG.selectors.itemRow);

        log(`Found ${itemRows.length} item rows`);

        itemRows.forEach((row, index) => {
            const skuElement = row.querySelector(CONFIG.selectors.itemSku);
            const nameElement = row.querySelector(CONFIG.selectors.itemName);

            if (skuElement) {
                const sku = skuElement.textContent.trim();
                const name = nameElement ? nameElement.textContent.trim() : '';

                items.push({
                    sku: sku,
                    name: name,
                    rowIndex: index
                });

                log(`Item ${index + 1}: SKU=${sku}, Name=${name}`);
            }
        });

        return items;
    }

    // ============================================================================
    // CUSTOMS DECLARATION MANAGEMENT
    // ============================================================================

    function getCustomsDeclarations() {
        return document.querySelectorAll(CONFIG.selectors.customsBlock);
    }

    function getAddDeclarationButton() {
        return document.querySelector(CONFIG.selectors.addButton);
    }

    async function addCustomsDeclaration() {
        const addButton = getAddDeclarationButton();
        if (!addButton) {
            log('Add declaration button not found', 'error');
            return false;
        }

        const beforeCount = getCustomsDeclarations().length;
        await clickElement(addButton);
        await wait(CONFIG.delays.afterAdd);

        const afterCount = getCustomsDeclarations().length;
        const success = afterCount > beforeCount;

        if (success) {
            log(`Added declaration (now ${afterCount} total)`, 'success');
        } else {
            log('Failed to add declaration', 'error');
        }

        return success;
    }

    async function fillCustomsDeclaration(declaration, itemData, cusmaData) {
        log(`Filling declaration for SKU: ${itemData.sku}`);

        const inputs = {
            sku: declaration.querySelector(CONFIG.selectors.sku),
            description: declaration.querySelector(CONFIG.selectors.description),
            harmonization: declaration.querySelector(CONFIG.selectors.harmonization),
            quantity: declaration.querySelector(CONFIG.selectors.quantity),
            itemValue: declaration.querySelector(CONFIG.selectors.itemValue)
        };

        // Validate all required inputs exist
        const missingInputs = Object.entries(inputs)
            .filter(([key, input]) => !input)
            .map(([key]) => key);

        if (missingInputs.length > 0) {
            log(`Missing inputs: ${missingInputs.join(', ')}`, 'error');
            return false;
        }

        // Fill in the data
        await setInputValue(inputs.sku, itemData.sku);
        await setInputValue(inputs.description, cusmaData.description);
        await setInputValue(inputs.harmonization, cusmaData.tariffNo); // Using correct selector
        await setInputValue(inputs.quantity, itemData.quantity || '1');

        if (itemData.value) {
            await setInputValue(inputs.itemValue, itemData.value);
        }

        log(`Successfully filled declaration for ${itemData.sku}`, 'success');
        return true;
    }

    // ============================================================================
    // MAIN AUTOFILL LOGIC
    // ============================================================================

    async function autofillCustoms() {
        log('Starting customs autofill process...', 'info');

        const items = getOrderItems();

        if (items.length === 0) {
            log('No items found in order', 'warn');
            showNotification('No items found in order', 'warning');
            return;
        }

        // Filter items that exist in CUSMA database
        const validItems = items.filter(item => {
            const exists = CUSMA_DATABASE.hasOwnProperty(item.sku);
            if (!exists) {
                log(`SKU ${item.sku} not found in CUSMA database`, 'warn');
            }
            return exists;
        });

        if (validItems.length === 0) {
            log('No valid items found in CUSMA database', 'warn');
            showNotification('No items found in CUSMA database', 'warning');
            return;
        }

        log(`Processing ${validItems.length} valid items`, 'info');

        // Get existing declarations
        let declarations = Array.from(getCustomsDeclarations());

        // Add more declarations if needed
        while (declarations.length < validItems.length) {
            const added = await addCustomsDeclaration();
            if (!added) {
                log('Failed to add required declarations', 'error');
                break;
            }
            declarations = Array.from(getCustomsDeclarations());
        }

        // Fill each declaration
        let successCount = 0;
        for (let i = 0; i < validItems.length && i < declarations.length; i++) {
            const item = validItems[i];
            const cusmaData = CUSMA_DATABASE[item.sku];
            const declaration = declarations[i];

            const success = await fillCustomsDeclaration(declaration, item, cusmaData);
            if (success) {
                successCount++;
            }
        }

        log(`Autofill complete: ${successCount}/${validItems.length} declarations filled`, 'success');
        showNotification(`Filled ${successCount} of ${validItems.length} declarations`, 'success');
    }

    async function fixDescriptions() {
        log('Fixing descriptions in existing declarations...', 'info');

        const declarations = Array.from(getCustomsDeclarations());
        let fixedCount = 0;

        for (const declaration of declarations) {
            const skuInput = declaration.querySelector(CONFIG.selectors.sku);
            const descInput = declaration.querySelector(CONFIG.selectors.description);
            const harmonizationInput = declaration.querySelector(CONFIG.selectors.harmonization);

            if (!skuInput || !descInput || !harmonizationInput) {
                continue;
            }

            const sku = skuInput.value.trim();

            if (!sku || !CUSMA_DATABASE.hasOwnProperty(sku)) {
                continue;
            }

            const cusmaData = CUSMA_DATABASE[sku];
            const currentDesc = descInput.value.trim();
            const currentHarmonization = harmonizationInput.value.trim();

            // Fix description if different
            if (currentDesc !== cusmaData.description) {
                await setInputValue(descInput, cusmaData.description);
                log(`Fixed description for ${sku}`, 'success');
                fixedCount++;
            }

            // Fix harmonization code if different
            if (currentHarmonization !== cusmaData.tariffNo) {
                await setInputValue(harmonizationInput, cusmaData.tariffNo);
                log(`Fixed harmonization code for ${sku}`, 'success');
            }
        }

        log(`Fixed ${fixedCount} descriptions`, 'success');
        showNotification(`Fixed ${fixedCount} descriptions`, 'success');
    }

    // ============================================================================
    // UI NOTIFICATIONS
    // ============================================================================

    function showNotification(message, type = 'info') {
        const colors = {
            success: '#4CAF50',
            error: '#f44336',
            warning: '#ff9800',
            info: '#2196F3'
        };

        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background-color: ${colors[type] || colors.info};
            color: white;
            border-radius: 4px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
            z-index: 10000;
            font-family: Arial, sans-serif;
            font-size: 14px;
            max-width: 300px;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transition = 'opacity 0.5s';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    // ============================================================================
    // UI CONTROLS
    // ============================================================================

    function createControlPanel() {
        const panel = document.createElement('div');
        panel.id = 'customs-autofill-panel';
        panel.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: white;
            border: 2px solid #0066cc;
            border-radius: 8px;
            padding: 15px;
            z-index: 9999;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            font-family: Arial, sans-serif;
            min-width: 250px;
        `;

        panel.innerHTML = `
            <div style="margin-bottom: 10px; font-weight: bold; color: #0066cc; font-size: 16px;">
                Customs Autofiller
            </div>
            <div style="margin-bottom: 10px; font-size: 12px; color: #666;">
                Database: ${Object.keys(CUSMA_DATABASE).length} SKUs
            </div>
            <button id="autofill-btn" style="
                width: 100%;
                padding: 10px;
                margin-bottom: 8px;
                background-color: #0066cc;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
                font-weight: bold;
            ">Fill Customs (Ctrl+Shift+F)</button>
            <button id="fix-desc-btn" style="
                width: 100%;
                padding: 10px;
                margin-bottom: 8px;
                background-color: #28a745;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
            ">Fix Descriptions</button>
            <label style="display: block; margin-top: 10px; font-size: 12px;">
                <input type="checkbox" id="auto-mode-checkbox" style="margin-right: 5px;">
                Auto Mode (Ctrl+Shift+A)
            </label>
            <div id="auto-mode-status" style="
                margin-top: 8px;
                padding: 8px;
                background: #f0f0f0;
                border-radius: 4px;
                font-size: 11px;
                display: none;
            ">
                Auto mode: <span id="auto-mode-text">OFF</span>
            </div>
        `;

        document.body.appendChild(panel);

        // Add event listeners
        document.getElementById('autofill-btn').addEventListener('click', autofillCustoms);
        document.getElementById('fix-desc-btn').addEventListener('click', fixDescriptions);
        document.getElementById('auto-mode-checkbox').addEventListener('change', toggleAutoMode);

        log('Control panel created', 'success');
    }

    // ============================================================================
    // AUTO MODE
    // ============================================================================

    let autoModeInterval = null;

    function toggleAutoMode(event) {
        const enabled = event ? event.target.checked : !CONFIG.autoMode.enabled;
        CONFIG.autoMode.enabled = enabled;

        const statusDiv = document.getElementById('auto-mode-status');
        const statusText = document.getElementById('auto-mode-text');

        if (enabled) {
            log('Auto mode ENABLED', 'success');
            statusDiv.style.display = 'block';
            statusText.textContent = 'ON';
            statusText.style.color = '#00cc00';
            statusText.style.fontWeight = 'bold';

            // Start auto-filling at intervals
            autoModeInterval = setInterval(() => {
                log('Auto mode: Running autofill...', 'info');
                autofillCustoms();
            }, CONFIG.autoMode.interval);

            showNotification('Auto mode enabled', 'success');
        } else {
            log('Auto mode DISABLED', 'warn');
            statusDiv.style.display = 'none';
            statusText.textContent = 'OFF';

            if (autoModeInterval) {
                clearInterval(autoModeInterval);
                autoModeInterval = null;
            }

            showNotification('Auto mode disabled', 'info');
        }
    }

    // ============================================================================
    // KEYBOARD SHORTCUTS
    // ============================================================================

    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', (event) => {
            // Ctrl+Shift+F: Autofill customs
            if (event.ctrlKey && event.shiftKey && event.key === 'F') {
                event.preventDefault();
                log('Keyboard shortcut: Autofill triggered', 'info');
                autofillCustoms();
            }

            // Ctrl+Shift+A: Toggle auto mode
            if (event.ctrlKey && event.shiftKey && event.key === 'A') {
                event.preventDefault();
                log('Keyboard shortcut: Auto mode toggle triggered', 'info');
                const checkbox = document.getElementById('auto-mode-checkbox');
                if (checkbox) {
                    checkbox.checked = !checkbox.checked;
                    toggleAutoMode({ target: checkbox });
                }
            }
        });

        log('Keyboard shortcuts registered (Ctrl+Shift+F, Ctrl+Shift+A)', 'success');
    }

    // ============================================================================
    // INITIALIZATION
    // ============================================================================

    function init() {
        log('Initializing Customs Autofiller...', 'info');
        log(`CUSMA Database loaded: ${Object.keys(CUSMA_DATABASE).length} SKUs`, 'success');

        // Wait for page to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(init, 1000);
            });
            return;
        }

        // Create UI
        createControlPanel();
        setupKeyboardShortcuts();

        log('Customs Autofiller ready!', 'success');
        showNotification('Customs Autofiller loaded', 'success');
    }

    // Start the script
    init();

})();
