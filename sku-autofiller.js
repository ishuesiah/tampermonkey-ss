Research preview
$1,000 credit
// ==UserScript==
// @name         ShipStation SKU Auto-Filler with Auto-Navigation + Description Cleaner
// @namespace    hemlock-oak
// @version      12.0
// @description  Fills customs SKUs, fixes descriptions, and auto-navigates
// @author       Hemlock & Oak
// @match        https://*.shipstation.com/*
// @match        https://ship.shipstation.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    console.log('🚀 SKU Auto-Filler v12.0: With Description Cleaner');

    let autoMode = false;
    let processedThisPage = false;
    let currentOrderId = null;
    let retryCount = 0;
    let isProcessing = false;
    const MAX_RETRIES = 3;
    const CUSTOMS_WAIT_TIME = 3000;

    // CUSMA Database (same as in summary script)
    const CUSMA_DATABASE = {
            "2025Q4-DAI-AUT": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-DLP-AUT-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2025Q4-DAI-CHA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-DLP-ELD-IM-AA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-DLP-ELD-IM-AB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2025Q4-DAI-ELD": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-DLP-ELD-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-DLP-ENC-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-DLP-LIL-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2025Q4-DAI-LIL": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2025Q4-DAI-MID": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-DLP-MO-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-DLP-NIM-IMP": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-DLP-NIM-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-DLP-RIV-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2025Q4-DAI-RIV": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-DLP-TDL-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2025Q4-DAI-TOI": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-DLP-WO-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2025Q4-DAI-WIL": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "INSHR-A5DISC-25W-MS": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INSHR-CLHP-25W-MS": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INSHR-HL-25W-MS": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INSHR-A5-25W-MS": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INSHR-CLHP-25W-SS": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INSHR-HL-25W-SS": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INSHR-A5-25W-SS": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "25-MIN-A5-AUT-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-A5-AUT-IM-AA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-A5-CHB-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-A5-ELD-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-A5-ECF-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-A5-LIL-IM-AA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-A5-LIL-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-A5-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-A5-MO-AA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-A5-MOS-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-A5-NIM-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-A5-RIV-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-A5-RWO-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-A5-RWO-IM-AA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2025Q4-MIN-A5-TOI": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-A5-WOR-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-A5-WOR-IM-AB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-A5-WOR-IM-AA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-A5-WIS-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-B5-AUT-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-B5-CHB-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-B5-CHB-IM-AA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-B5-CHB-IM-AB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-B5-ELD-IM-AB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-B5-ELD-IM-AC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-B5-ELD-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-B5-ELD-IM-AA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-B5-ECF-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-B5-ECF-IM-AA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-B5-LIL-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-B5-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-B5-MOS-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-B5-NIM-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-B5-NIM-IM-AA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-B5-RIV-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-B5-TDL-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-B5-WOR-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-B5-WOR-IM-AA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-A5-AUT": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2025Q4-MIN-CHA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-A5-ELD": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-A5-ENF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2025Q4-MIN-LIL": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2025Q4-MIN-MID": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2025Q4-MIN-MOS": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-A5-NIM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2025Q4-MIN-RIV": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-WKP-MIN-RWO": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-MIN-A5-TDL": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2025Q4-MIN-WIL": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-WKP-MIN-WIS": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2025Q4-MIN-AUT": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-WKP-MIN-CHB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-WKP-MIN-CHB-AA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2025Q4-MIN-ELD": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2025Q4-MIN-ENC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-WKP-MIN-LIL": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-WKP-MIN": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-WKP-MIN-MOS": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2025Q4-MIN-NIM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-WKP-MIN-RIV": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2025Q4-MIN-TOI": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "25-WKP-MIN-WOR": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "INS-HPC-25OV": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INS-HL-25OV": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INS-A5-25OV": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INS-HPC-24RV": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INS-HL-24RV": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INS-A5-24RV": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "25-INS-A5": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INSWKS-CLHP-25-MS": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INSWKS-DISCA5-25-MS": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INSWKS-A5-25-MS": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INS-HL-WKL-MON": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INSCAL-A5DISC-25-MS": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INSCAL-CLHP-25-MS": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INSCAL-HL-25-MS": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INSCAL-A5-25-MS": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INSCAL-A5-25-SS": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "2026Q4-A5MIN-H-CLOTH-AUT": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-H-CLOTH-CHB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-H-CLOTH-ENF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-H-CLOTH-FWN": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-H-CLOTH-MOS": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-H-CLOTH-RIV": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-H-CLOTH-SCA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-H-HARD-AUT": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-H-HARD-BLF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-H-HARD-CHB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-H-HARD-ENF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-H-HARD-FWN": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-H-HARD-MOS": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-H-HARD-PLG": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-H-HARD -RIV": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-H-HARD-SCA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-H-HARD-WDI": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-H-HARD-WIT": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-H-HARD-WDL": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-H-PAPER-CHB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-H-PAPER-MOS": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-H-PAPER-RIV": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-H-PAPER-SCA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-V-CLOTH-AUT": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-V-CLOTH-CHB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-V-CLOTH-ENF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-V-CLOTH-FWN": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-V-CLOTH-MOS": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-V-CLOTH-RIV": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-V-CLOTH-SCA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-V-HARD-AUT": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-V-HARD-BLF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-V-HARD-CHB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-V-HARD-ENF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-V-HARD-FWN": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-V-HARD-MOS": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-V-HARD-PLG": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-V-HARD-RIV": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-V-HARD-SCA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-V-HARD-WDI": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-V-HARD-WIT": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-V-HARD-WDL": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-V-PAPER-CHB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-V-PAPER-MOS": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-V-PAPER-RIV": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-A5MIN-V-PAPER-SCA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-B5MIN-CLOTH-AUT": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-B5MIN-CLOTH-CHB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-B5MIN-CLOTH-ENF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-B5MIN-CLOTH-FWN": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-B5MIN-CLOTH-MOS": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-B5MIN-CLOTH-RIV": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-B5MIN-CLOTH-SCA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-B5MIN-HARD-AUT": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-COMBO-HARD-BLF-2": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-B5MIN-HARD-CHB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-B5MIN-HARD-ENF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-B5MIN-HARD-FWN": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-B5MIN-HARD-MOS": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-B5MIN-HARD-PLG": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-B5MIN-HARD-RIV": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-B5MIN-HARD-SCA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-B5MIN-HARD-WDI": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-B5MIN-HARD-WIT": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-B5MIN-HARD-WDL": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-B5MIN-PAPER-CHB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-B5MIN-PAPER-MOS": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-B5MIN-PAPER-RIV": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-B5MIN-PAPER-SCA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DUO-CLOTH-AUT": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DUO-CLOTH-CHB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DUO-CLOTH-ENF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DUO-CLOTH-FWN": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DUO-CLOTH-MOS": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DUO-CLOTH-RIV": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DUO-CLOTH-SCA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DUO-HARD-AUT": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DUO-HARD-BLF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DUO-HARD-WCHB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DUO-HARD-ENF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DUO-HARD-FWN": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DUO-HARD-MOS": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DUO-HARD-RIV": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DUO-HARD-SCA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DUO-HARD-WDI": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DUO-HARD-WIT": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DUO-HARD-WDL": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DUO-PAPER-CHB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DUO-PAPER-MOS": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "22026Q4-DUO-PAPER-RIV": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DUO-PAPER-SCA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DAILY-CLOTH-AUT": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DAILY-CLOTH-CHB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DAILY-CLOTH-ENF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DAILY-CLOTH-FWN": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DAILY-CLOTH-MOS": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DAILY-CLOTH-RIV": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DAILY-CLOTH-SCA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DAILY-HARD-AUT": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DAILY-HARD-BLF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DAILY-HARD-CHB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DAILY-HARD-ENF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DAILY-HARD-FWN": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DAILY-HARD-MOS": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DAILY-HARD-PLG": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DAILY-HARD-RIVv": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DAILY-HARD-SCA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DAILY-HARD-WDI": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DAILY-HARD-WIT": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DAILY-HARD-WDL": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DAILY-PAPER-ENF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DAILY-PAPER-MOS": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DAILY-PAPER-RIV": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-DAILY-PAPER-SCA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-HOR-CLOTH-AUT": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-HOR-CLOTH-CHB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-HOR-CLOTH-ENF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-HOR-CLOTH-FWN": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-HOR-CLOTH-MOS": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-HOR-CLOTH-RIV": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-HOR-CLOTH-SCA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-HOR-HARD-AUT": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-HOR-HARD-BLF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-HOR-HARD-CHB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-HOR-HARD-ENF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-HOR-HARD-FWN": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-HOR-HARD- MOS": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-HOR-HARD-PLG": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-HOR-HARD-RIV": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-HOR-HARD-SCA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-HOR-HARD-WDI": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-HOR-HARD-WIT": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-HOR-HARD-WDL": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-HOR-PAPER-CHB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-HOR-PAPER-MOS": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-HOR-PAPER-RIV": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-HOR-PAPER-SCA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "26-PLNR-BNDL-AUT-AC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "26-PLNR-BNDL-AUT-AA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "26-PLNR-BNDL-AUT": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "26-PLNR-BNDL-AUT-AB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "26-PLNR-BNDL-CHB-AC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "26-PLNR-BNDL-CHB-AA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "26-PLNR-BNDL-CHB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "26-PLNR-BNDL-CHB-AB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "26-PLNR-BNDL-ECF-AC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "26-PLNR-BNDL-ECF-AA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "26-PLNR-BNDL-ECF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "26-PLNR-BNDL-ECF-AB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "26-PLNR-BNDL-FWN-AC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "26-PLNR-BNDL-FWN-AA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "26-PLNR-BNDL-FWN": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "26-PLNR-BNDL-FWN-AB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "26-PLNR-BNDL-MOS-AC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "26-PLNR-BNDL-MOS-AA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "26-PLNR-BNDL-MOS": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "26-PLNR-BNDL-MOS-AB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "26-PLNR-BNDL-RIV-AC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "26-PLNR-BNDL-RIV-AA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "26-PLNR-BNDL-RIV": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "26-PLNR-BNDL-RIV-AB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "26-PLNR-BNDL-OAK-AC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "26-PLNR-BNDL-OAK-AA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "26-PLNR-BNDL-OAK": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "26-PLNR-BNDL-OAK-AB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "26-PLNR-BNDL-WIN-AC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "26-PLNR-BNDL-WIN-AA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "26-PLNR-BNDL-WIN": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "26-PLNR-BNDL-WIN-AB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "26-PLNR-BNDL-WDL-AC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "26-PLNR-BNDL-WDL-AA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "26-PLNR-BNDL-WDL": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "26-PLNR-BNDL-WDL-AB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-COMBO-CLOTH-AUT": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-COMBO-CLOTH-CHB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-COMBO-CLOTH-ENF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-COMBO-CLOTH-FWN": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-COMBO-CLOTH-MOS": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-COMBO-CLOTH-RIV": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-COMBO-CLOTH-SCA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-COMBO-HARD-AUT": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-COMBO-HARD-BLF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-COMBO-HARD-CHB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-COMBO-HARD-ENF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-COMBO-HARD-FWN": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-COMBO-HARD-MOS": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-COMBO-HARD-PLG": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-COMBO-HARD-RIV": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-COMBO-HARD-SCA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-COMBO-HARD-WDI": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-COMBO-HARD-WIT": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-COMBO-HARD-WDL": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-COMBO-PAPER-CHB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-COMBO-PAPER-MOS": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-COMBO-PAPER-RIV": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-COMBO-PAPER-SCA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-WEEKLY-CLOTH-AUT": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-WEEKLY-CLOTH-CHB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-WEEKLY-CLOTH-ENF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-WEEKLY-CLOTH-FWN": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-WEEKLY-CLOTH-MOS": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-WEEKLY-CLOTH-RIV": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-WEEKLY-CLOTH-SCA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-WEEKLY-HARD-AUT": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-WEEKLY-HARD-BLF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-WEEKLY-HARD-CHB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-WEEKLY-HARD-ENF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-WEEKLY-HARD-FWN": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-WEEKLY-HARD-MOS": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-WEEKLY-HARD-PLG": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-WEEKLY-HARD-RIV": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-WEEKLY-HARD-SCA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-WEEKLY-HARD-WDI": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-WEEKLY-HARD-WIT": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-WEEKLY-HARD-WDL": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-WEEKLY-PAPER-CHB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-WEEKLY-PAPER-MOS": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-WEEKLY-PAPER-RIV": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "2026Q4-WEEKLY-PAPER-SCA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "NTB-AST-BLNK": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DEE-BLNK": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-MAR-BLNK": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-ROS-BLNK": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-SEC-BLNK": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-WHI-BLNK": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-WIS-BLNK": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "INS-CL-BLNK-DIS": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INS-DB-HL-BLNK-DIS": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INS-A5-BLNK-RIN": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "NTB-DOT-DAH-AC": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-A5-DAH": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-DAH-AA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-A5-DAH-AA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-DAH": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-A5-DAH-AB": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-DAH-AB": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-A5-DAH-AC": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "JWL-14K-EAR-GLD-14": {
                "hs": "7113115000",
                "origin": "CA",
                "name": "Sterling silver jewellery earrings"
            },
            "JWL-CMS-EAR-GLD-14": {
                "hs": "7113115000",
                "origin": "CA",
                "name": "Sterling silver jewellery earrings"
            },
            "DOT-FWN-HA5-CUR": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-MON-HA5-CUR": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-RIV-HA5-CUR": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-FWN-HB5-RAB": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "DOT-RIV-HB5-RAB": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "DOT-FWN-HTN-RAB": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-MON-HTN-RAB": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-RIV-HTN-RAB": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-FWN-HA5-CUR70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-MON-HA5-CUR70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-RIV-HA5-CUR70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-FWN-HA5-CUR-2": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-MON-HA5-CUR-2": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-RIV-HA5-CUR-2": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-FWN-HB5-RAB-2": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "GRP-RIV-HB5-RAB-2": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "GRP-FWN-HTN-RAB-2": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-MON-HTN-RAB-2": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-RIV-HTN-RAB-2": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-FWN-HA5-CUR70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-MON-HA5-CUR70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-RIV-HA5-CUR70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-FWN-HA5-CUR": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-MON-HA5-CUR": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-RIV-HA5-CUR": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-FWN-HA5-CUR": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-MON-HA5-CUR": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-RIV-HA5-CUR": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-FWN-HB5-RAB": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "GRP-RIV-HB5-RAB": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "GRP-FWN-HTN-RAB": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-MON-HTN-RAB": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-RIV-HTN-RAB": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NP-DN": {
                "hs": "4820102020",
                "origin": "CA",
                "name": "Notepad"
            },
            "WK-DEF-AB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "DOT-AUT-CFX": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-CHB-CFX": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-AST-CFX": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-ENF-CFX": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-FAW-CFX": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-MON-CFX": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-MOS-CFX": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-RIV-CFX": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-SCO-CFX": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-AUT-CF7": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-CHB-CF7": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-AST-CF7": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-ENF-CF7": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-FWN-CF7": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-MON-CF7": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-MOS-CF7": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-RIV-CF7": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-SCO-CF7": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-AUT-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-BLF-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-BTC-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-CHB-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-AST-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-ENF-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-FAW-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-MON-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-MOS-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-PLG-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-RIV-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-SCO-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-SNP-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-WDI-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-WDL-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-AUT-HB5": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "DOT-BLF-HB5": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "DOT-CHB-HB5": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "DOT-ENF-HB5": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "DOT-FAW-HB5": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "DOT-MOS-HB5": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "DOT-RIV-HB5": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "DOT-SCO-HB5": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "DOT-WDI-HB5": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "DOT-WDL-HB5": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "DNT-BLF-HTN": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DNT-BTC-HTN": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DNT-CHB-HTN": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DNT-ENF-HTN": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DNT-FAW-HTN": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DNT-MON-HTN": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DNT-MOS-HTN": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DNT-RIV-HTN": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DNT-SNP-HTN": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DNT-WDL-HTN": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-AUT-H70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-BLF-H70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-BTC-H70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-CHB-H70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-AST-H70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-ENF-H70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-FWN-H70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-MON-H70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-MOS-H70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-RIV-H70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-SCO-H70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-SNP-H70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-WDI-H70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-WDL-H70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-CHB-P15": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-MOS-P15": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-RIV-P15": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-SCA-P15": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-CHB-PF7": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-MOS-PF7": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-RIV-PF7": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-SCA-PF7": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NP-DO": {
                "hs": "4820102020",
                "origin": "CA",
                "name": "Notepad"
            },
            "INS-CL-DOT-DIS": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INS-DB-HL-DOT-DIS": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INS-A5-DOT-RIN": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "STK-HDR": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "STK-LKS": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "STK-SPN": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "STK-FIN-SMT": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "NBD-SP-24-A5-DA-FLR": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-B5-DA-FLR": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NBD-SP-24-TN-DA-FLR": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-A5-JP-FLR": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-B5-JP-FLR": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NBD-SP-24-TN-JP-FLR": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-A5-PF-FLR": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-B5-PF-FLR": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NBD-SP-24-TN-PF-FLR": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-A5-SL-FLR": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-B5-SL-FLR": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NBD-SP-24-TN-SL-FLR": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-A5-WO-FLR": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-B5-WO-FLR": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NBD-SP-24-TN-WO-FLR": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-A5-WL-FLR": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-B5-WL-FLR": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NBD-SP-24-TN-WL-FLR": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-A5-DAH-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-A5-JUN-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-A5-PAC-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-A5-WOR-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-A5-WOR-IM-AA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-A5-WIL-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-B5-DAH-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-B5-DAH-IM-AA": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-DOT-B5-JUN-IM": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-DOT-B5-PAC-IM": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-DOT-B5-WOR-IM": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-DOT-B5-WIL-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-TN-DAH-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-TN-JUN-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-TN-PAC-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-TN-WOR-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-TN-WOR-IM-AA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-TN-WIL-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NB-DEE-A-GPH": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NB-JUN-A-GPH": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NB-PAC-A-GPH": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NB-SLA-A-GPH": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NB-WIL-A-GPH": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-WIL-AB": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NB-DEE-B-GPH": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NB-JUN-B-GPH": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NB-PAC-B-GPH": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NB-SLA-B-GPH": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NB-WIL-B-GPH": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-GRD-WIL-AC": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NB-DEE-TN-GPH": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NB-JUN-TN-GPH": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NB-PAC-TN-GPH": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NB-SLA-TN-GPH": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NB-WIL-TN-GPH": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-WIL": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-A5-JUN-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-A5-PAC-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-A5-PAC-IM-AA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-A5-WOR-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-A5-WOR-IM-AB": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-A5-WOR-IM-AA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-A5-WIL-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-B5-DAH-IM": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-GRD-B5-JUN-IM": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-GRD-B5-PAC-IM": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-GRD-B5-WOR-IM": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-GRD-B5-WIL-IM": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-GRD-TN-DAH-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-TN-JUN-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-TN-PAC-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-TN-WOR-IM-AA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-TN-WOR-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "FR-TRNSPKT": {
                "hs": "",
                "origin": "CA",
                "name": ""
            },
            "GFT-10": {
                "hs": "",
                "origin": "CA",
                "name": ""
            },
            "GC-100": {
                "hs": "",
                "origin": "CA",
                "name": ""
            },
            "GC-125": {
                "hs": "",
                "origin": "CA",
                "name": ""
            },
            "GFT-15": {
                "hs": "",
                "origin": "CA",
                "name": ""
            },
            "GC-150": {
                "hs": "",
                "origin": "CA",
                "name": ""
            },
            "GC-200": {
                "hs": "",
                "origin": "CA",
                "name": ""
            },
            "GFT-25": {
                "hs": "",
                "origin": "CA",
                "name": ""
            },
            "GFT-5": {
                "hs": "",
                "origin": "CA",
                "name": ""
            },
            "GC-50": {
                "hs": "",
                "origin": "CA",
                "name": ""
            },
            "GC-75": {
                "hs": "",
                "origin": "CA",
                "name": ""
            },
            "INS-A5-A5X": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INS-CL-CLA": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INS-HL-HAL": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "GRP-AUT-CF7": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-CHB-CF7": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-AST-CF7": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-ENF-CF7": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-FWN-CF7": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-MON-CF7": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-MOS-CF7": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-RIV-CF7": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-SCO-CF7": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-AUT-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-BLF-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-BTC-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-CHB-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-AST-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-ENF-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-FWN-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-MON-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-MOS-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-RIV-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-SCO-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-SNP-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-WDL-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-AUT-HB5": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "GRP-BLF-HB5": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "GRP-CHB-HB5": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "GRP-ENF-HB5": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "GRP-FWN-HB5": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "GRP-MOS-HB5": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "GRP-RIV-HB5": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "GRP-SCO-HB5": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "GRP-WDI-HB5": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "GRP-WDL-HB5": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "GNT-BLF-HTN": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GNT-BTC-HTN": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GNT-CHB-HTN": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GNT-ENF-HTN": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GNT-FWN-HTN": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GNT-MON-HTN": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GNT-MOS-HTN": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GNT-RIV-HTN": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GNT-SNP-HTN": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GNT-WDL-HTN": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-AUT-H70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-BLF-H70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-BTC-H70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-CHB-H70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-AST-H70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-ENF-H70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-FWN-H70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-MON-H70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-MOS-H70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-RIV-H70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-SCO-H70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-SNP-H70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-WDI-H70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-WDL-H70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-CHB-PF7": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-MOS-PF7": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-RIV-PF7": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-FWN-PF7": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NP-BN": {
                "hs": "4820102020",
                "origin": "CA",
                "name": "Notepad"
            },
            "INS-HPC-GP": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INS-HL-GP": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INS-A5-GP": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INSWKS-CLHP-25-SS": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INSWKS-HL-25-SS": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INSWKS-A5-25-SS": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "STCK-HABIT": {
                "hs": "4820102020",
                "origin": "CA",
                "name": "Sticky notepad"
            },
            "STCK-HABIT-2": {
                "hs": "4820102020",
                "origin": "CA",
                "name": "Sticky notepad"
            },
            "DOT-BLF-HA5-HOF": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-ENF-HA5-HOF": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-WDL-HA5-HOF": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-BLF-HB5-HOF": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "DOT-ENF-HB5-HOF": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "DOT-WDL-HB5-HOF": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "DOT-BLF-HTN-HOF": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-ENF-HTN-HOF": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-WDL-HTN-HOF": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-BLF-HA5-HOF70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-ENF-HA5-HOF70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-WDL-HA5-HOF70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-BLF-HA5-HOF": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-ENF-HA5-HOF": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-WDL-HA5-HOF": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-BLF-HB5-HOF": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "GRP-ENF-HB5-HOF": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "GRP-WDL-HB5-HOF": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "GRP-BLF-HTN-HOF": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-ENF-HTN-HOF": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-WDL-HTN-HOF": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-LIN-A5-ECF": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-LIN-A5-WDL": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "JWL-14K-BRC-GLD-14": {
                "hs": "7113115000",
                "origin": "CA",
                "name": "Sterling silver jewellery bracelet"
            },
            "BRC-MED-GLP": {
                "hs": "7113115000",
                "origin": "CA",
                "name": "Sterling silver jewellery bracelet"
            },
            "JWL-HLC-BRC-GLD-14": {
                "hs": "7113115000",
                "origin": "CA",
                "name": "Sterling silver jewellery bracelet"
            },
            "JWL-SIL-BRC-SLV-AB": {
                "hs": "7113115000",
                "origin": "CA",
                "name": "Sterling silver jewellery bracelet"
            },
            "JWL-SIL-BRC-SLV-AA": {
                "hs": "7113115000",
                "origin": "CA",
                "name": "Sterling silver jewellery bracelet"
            },
            "JWL-SIL-BRC-SLV": {
                "hs": "7113115000",
                "origin": "CA",
                "name": "Sterling silver jewellery bracelet"
            },
            "BRC-SML-GLP-4": {
                "hs": "7113115000",
                "origin": "CA",
                "name": "Sterling silver jewellery earrings"
            },
            "BRC-SML-GLP-3": {
                "hs": "7113115000",
                "origin": "CA",
                "name": "Sterling silver jewellery earrings"
            },
            "PEN-ALUMINUM": {
                "hs": "9608100000",
                "origin": "CA",
                "name": "Gel ink pen"
            },
            "PEN-BRASS": {
                "hs": "9608100000",
                "origin": "CA",
                "name": "Gel ink pen"
            },
            "AC-HI-AUT": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "AC-HI-LR": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "AC-HI-MA": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "AC-HI-DAS": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "STK-HLT-DPO": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "AC-HI-FE": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "STK-HLT-FWN": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "STK-HLT-MRG": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "AC-HI-MO": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "AC-HI-MOS": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "AC-HI-NIM": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "AC-HI-ELB": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "AC-HI-RI": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "STK-HLT-OAK": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "STK-HLT-SNP": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "AC-HI-TDL": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "AC-HI-LI": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "AC-HI-WO": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "STK-HLT": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "JWL-HUM-EAR-PR-AA": {
                "hs": "7113115000",
                "origin": "CA",
                "name": "Sterling silver jewellery earrings"
            },
            "JWL-HUM-EAR-SN-AA": {
                "hs": "7113115000",
                "origin": "CA",
                "name": "Sterling silver jewellery earrings"
            },
            "DOT-RIV-HA5-HUM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-WDI-HA5-HUM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-RIV-HB5-HUM": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "DOT-WDI-HB5-HUM": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "DOT-RIV-HA5-HUM70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-WDI-HA5-HUM70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-RIV-HA5-HUM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-RIV-HB5-HUM": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "GRP-WDI-HB5-HUM": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "GRP-RIV-HA5-HUM70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-WDI-HA5-HUM70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-RIV-HA5-HUM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-WDI-HA5-HUM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "JWL-HUM-EAR-PR": {
                "hs": "7113115000",
                "origin": "CA",
                "name": "Sterling silver jewellery earrings"
            },
            "JWL-HUM-EAR-SN": {
                "hs": "7113115000",
                "origin": "CA",
                "name": "Sterling silver jewellery earrings"
            },
            "HYDR-DEF": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "DAI-ENC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WKP-UND-CHB-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WKP-UND-ECF-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WKP-UND-ECF-IM-AA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WKP-UND-FWN-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WKP-UND-MNF-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WKP-UND-MOS-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WKP-UND-MOS-IM-AA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WKP-UND-RIV-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "NTB-DOT-A5-PLG-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-A5-WIN-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-TN-SNP-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-TN-SNP-IM-AA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-TN-WDL-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-A5-SCA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-A5-SCA-AB": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-A5-SNA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-B5-AUT": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "GRP-B5-CHA-AC": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "GRP-TN-SNA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-B5-ENC": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-GRD-B5-ECF-IM": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-GRD-B5-WDL-IM": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-LIN-A5-ECF-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-LIN-A5-WDL-IM": {
                "hs": "4820102020",
                "origin": "CA",
                "name": "Notepad"
            },
            "DOT-A5-WIL": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-A5-WIL-AB": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-A5-RIV": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-LIN-A5-RIV-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-LIN-A5-WIN-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-A5-MOO": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-A5-SNA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-B5-CHA": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "DOT-B5-MOS": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-GRD-B5-FWN-IM": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-GRD-TN-FWN-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-A5-MOS": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-TN-BLO": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "IMP-DOT-ENC-A5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "IMP-DOT-WOO-A5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-A5-WOO": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-A5-WOO-AB": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-B5-CHA-AB": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "DLP-UND-OAK-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "DLP-UND-WDL-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WKP-UND-AUT-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WKP-UND-AUT-IM-AA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WKP-UND-BLO-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WKP-UND-BLO-IM-AA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WKP-UND-BTR-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WKP-UND-CHB-IM-AA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WKP-UND-ECF-IM-AB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WKP-UND-FWN-IM-AA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WKP-UND-MNF-IM-AA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WKP-UND-MOS-IM-AB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WKP-UND-RIV-IM-AA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WKP-UND-OAK-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WKP-UND-SNP-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WKP-UND-WIN-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WKP-UND-WIN-IM-AA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WKP-UND-WDL-IM": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WKP-UND-AUT-IM-AB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WKP-UND-BLO-IM-AB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WKP-UND-BTR-IM-AA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WKP-UND-CHB-IM-AB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WKP-UND-CHB-IM-AC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WKP-UND-ECF-IM-AC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WKP-UND-FWN-IM-AB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WKP-UND-MNF-IM-AB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WKP-UND-MOS-IM-AC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WKP-UND-RIV-IM-AB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WKP-UND-OAK-IM-AA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WKP-UND-SNP-IM-AA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WKP-UND-WIN-IM-AB": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WKP-UND-WIN-IM-AC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WKP-UND-WDL-IM-AA": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WK-RIV-AD": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WK-MOS-AE": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "NTB-BLNK-AST-AA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-BLNK-DPF-AA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-BLNK-MRG-AA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-BLNK-RWO-AA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-BLNK-SCG-AA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-BLNK-WOK-AA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-BLNK-WIS-AA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-BLNK-AST-IM-AB": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-BLNK-AST-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-BLNK-DPF-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-BLNK-MRG-IM-AA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-BLNK-RWO-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-BLNK-SCG-IM-AC": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-BLNK-SCG-IM-AD": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-BLNK-SCG-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-BLNK-WOK-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-BLNK-WIS-IM-AA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-AUT-CFX": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-CHB-CFX": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-AST-CFX": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-ENF-CFX": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-FWN-CFX": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-MON-CFX": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-MOS-CFX": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-RIV-CFX": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-SCO-CFX": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-AUT-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-BLF-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-BTC-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-CHB-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-AST-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-ENF-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-FWN-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-MON-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-MOS-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-RIV-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-SCO-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-SNP-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-WDI-HA5L": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-WDL-HA5": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-CHB-PFX": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-MOS-PFX": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-RIV-PFX": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-SCA-PFX": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NP-LI": {
                "hs": "4820102020",
                "origin": "CA",
                "name": "Notepad"
            },
            "LIST-DEF": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "NTB-BLNK-AST": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-BLNK-DPF": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-BLNK-MRG": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-BLNK-RWO": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-BLNK-SCG": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-BLNK-WOK": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-BLNK-WIS": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-BLNK-AST-IM-AA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-BLNK-DPF-IM-AA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-BLNK-MRG-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-BLNK-RWO-IM-AA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-BLNK-SCG-IM-AB": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-BLNK-SCG-IM-AA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-BLNK-SCG-IM-AE": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-BLNK-WOK-IM-AA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-BLNK-WIS-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-A5-DA-LMN": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-B5-DA-LMN": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-DOT-DAH-AD": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-A5-JP-LMN": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-B5-JP-LMN": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NBD-SP-24-TN-JP-LMN": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-A5-PF-LMN": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-B5-PF-LMN": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NBD-SP-24-TN-PF-LMN": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-A5-SL-LMN": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-B5-SL-LMN": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NBD-SP-24-TN-SL-LMN": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-A5-WO-LMN": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-B5-WO-LMN": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NBD-SP-24-TN-WO-LMN": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-A5-WL-LMN": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-B5-WL-LMN": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NBD-SP-24-TN-WL-LMN": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-JUN-IM-AB": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-PAC-IM-AB": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-PAC-IM-AC": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-WOR-IM-AB": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-WIL-IM-AC": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-DAH-IM-AC": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-DOT-JUN-IM-AC": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-DOT-PAC-IM-AA": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-DOT-PAC-IM-AD": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-DOT-SLA-IM": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-DOT-WOR-IM-AC": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-DOT-WIL-IM-AD": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-DOT-DAH-IM-AD": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-DAH-IM-AE": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-JUN-IM-AD": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-JUN-IM-AE": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-PAC-IM-AE": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-SLA-IM-AA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-WOR-IM-AD": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-WIL-IM-AE": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NB-DEE-AX-GPH": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NB-JUN-AX-GPH": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NB-PAC-AX-GPH": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-SLA-AB": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NB-WIL-AX-GPH": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-WIL-AF": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-DAH-AB": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NB-JUN-BX-GPH": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NB-PAC-BX-GPH": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-GRD-SLA-AC": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NB-WIL-BX-GPH": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-GRD-WIL-AH": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-GRD-DAH-AA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NB-JUN-TNX-GPH": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NB-PAC-TNX-GPH": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-SLA-AA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NB-WIL-TNX-GPH": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-WIL-AD": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-DAH-IM-AC": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-JUN-IM-AC": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-WOR-IM-AB": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-WOR-IM-AF": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-WIL-IM-AE": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-DAH-IM-AA": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-GRD-JUN-IM-AB": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-GRD-PAC-IM-AB": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-GRD-WOR-IM-AD": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-GRD-WOR-IM-AE": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-GRD-WIL-IM-AD": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-GRD-WIL-IM-AC": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-GRD-DAH-IM-AB": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-JUN-IM-AE": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-PAC-IM-AC": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-PAC-IM-AD": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-SLA-IM-AB": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-WOR-IM-AC": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-WIL-IM-AB": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-JUN-IM-AG": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-PAC-IM-AF": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-WOR-IM-AF": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-WIL-IM-AF": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-DAH-IM-AG": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-DOT-JUN-IM-AF": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-DOT-PAC-IM-AH": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-DOT-SLA-IM-AB": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-DOT-WOR-IM-AE": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-DOT-WOR-IM-AI": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-DOT-WOR-IM-AG": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-DOT-WOR-IM-AH": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-DOT-WIL-IM-AG": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-DOT-DAH-IM-AF": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-PAC-IM-AI": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-PAC-IM-AG": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-SLA-IM-AC": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-WOR-IM-AJ": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-JUN-IM-AG": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-IM-AA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-PAC-IM-AG": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-SLA-IM-AC": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-WOR-IM-AH": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-WOR-IM-AI": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-WIL-IM-AF": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-DAH-IM-AD": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-GRD-JUN-IM-AF": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-GRD-JUN-IM-AH": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-GRD-PAC-IM-AE": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-GRD-WOR-IM-AJ": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-GRD-WOR-IM-AK": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-GRD-WIL-IM-AG": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-GRD-JUN-IM-AD": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-WOR-IM-AG": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-PAC-IM-AF": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-B5-LUN-DA": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NBD-SP-24-TN-LUN-DA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-A5-LUN-JP": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-B5-LUN-JP": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-TN-LUN-JP": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-A5-LUN-PA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-B5-LUN-PA": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NBD-SP-24-TN-LUN-PA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-A5-LUN-SL": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-B5-LUN-SL": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NBD-SP-24-TN-LUN-SL": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-A5-LUN-WO": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-B5-LUN-WO": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NBD-SP-24-TN-LUN-WO": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-A5-LUN-WL": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-B5-LUN-WL": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NBG-SP-24-TN-LUN-WL": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NB-DEE-BX-GPH": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NB-DEE-TNX-GPH": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-JUN-AB": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-JUN-AC": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-GRD-JUN-AA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-PAC-AB": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-PAC-AC": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-GRD-PAC-AA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NB-SLA-AX-GPH": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NB-SLA-BX-GPH": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NB-SLA-TNX-GPH": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-WOR-AA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-WOR-AB": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-GRD-WOR": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-WIL-AG": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-WIL-AI": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-GRD-WIL-AE": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "JWL-LNR-BRC-GLD-14AA": {
                "hs": "7113115000",
                "origin": "CA",
                "name": "Sterling silver jewellery bracelet"
            },
            "JWL-LNR-BRC-GLD-AB": {
                "hs": "7113115000",
                "origin": "CA",
                "name": "Sterling silver jewellery bracelet"
            },
            "JWL-LNR-BRC-SLV-AB": {
                "hs": "7113115000",
                "origin": "CA",
                "name": "Sterling silver jewellery bracelet"
            },
            "JWL-LNR-BRC-GLD-14AB": {
                "hs": "7113115000",
                "origin": "CA",
                "name": "Sterling silver jewellery bracelet"
            },
            "JWL-LNR-BRC-GLD-AA": {
                "hs": "7113115000",
                "origin": "CA",
                "name": "Sterling silver jewellery bracelet"
            },
            "JWL-LNR-BRC-SLV-AA": {
                "hs": "7113115000",
                "origin": "CA",
                "name": "Sterling silver jewellery bracelet"
            },
            "JWL-LNR-BRC-GLD-14": {
                "hs": "7113115000",
                "origin": "CA",
                "name": "Sterling silver jewellery bracelet"
            },
            "JWL-LNR-BRC-GLD": {
                "hs": "7113115000",
                "origin": "CA",
                "name": "Sterling silver jewellery bracelet"
            },
            "JWL-LNR-BRC-SLV": {
                "hs": "7113115000",
                "origin": "CA",
                "name": "Sterling silver jewellery bracelet"
            },
            "STCK-WF-MOON": {
                "hs": "4811412100",
                "origin": "CA",
                "name": "Paper pocket for notebook"
            },
            "NBD-SP-24-A5-DA-MRQ": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-B5-DA-MRQ": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NBD-SP-24-TN-DA-MRQ": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-A5-JP-MRQ": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-B5-JP-MRQ": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NBD-SP-24-TN-JP-MRQ": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-A5-PF-MRQ": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-B5-PF-MRQ": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NBD-SP-24-TN-PF-MRQ": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-A5-SL-MRQ": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-B5-SL-MRQ": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NBD-SP-24-TN-SL-MRQ": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-A5-WO-MRQ": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-B5-WO-MRQ": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NBD-SP-24-TN-WO-MRQ": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-A5-WL-MRQ": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NBD-SP-24-B5-WL-MRQ": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NBD-SP-24-TN-WL-MRQ": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-DAH-IM-AB": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-WOR-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-WOR-IM-AA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-WIL-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-WIL-IM-AA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-DAH-IM-AA": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-DOT-DAH-IM": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-DOT-JUN-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-DOT-PAC-IM": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-DOT-WOR-IM-AL": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-DOT-WOR-IM-AK": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-DOT-WIL-IM-AB": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-DOT-JUN-IM-AA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NB-DEE-A5-GPH": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NB-JUN-A5-GPH": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NB-PAC-A5-GPH": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NB-SLA-A5-GPH": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NB-WIO-A5-GPH": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NB-WIL-A5-GPH": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NB-DEE-B5-GPH": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NB-JUN-B5-GPH": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NB-PAC-B5-GPH": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NB-SLA-B5-GPH": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NB-WIO-B5-GPH": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NB-WIL-B5-GPH": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-GRD-DAH": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-JUN": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-PAC": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-SLA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NB-WIO-TN-GPH": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-WIL-AA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-JUN-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-WOR-IM-AL": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-WOR-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-WIL-IM-AH": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-JUN-IM-AA": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-GRD-PAC-IM-AA": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-GRD-SLA-IM-AA": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-GRD-WOR-IM-AA": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-GRD-WIL-IM-AA": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "NTB-GRD-DAH-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-PAC-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-SLA-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-WIL-IM": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "JWL-MON-EAR-PR": {
                "hs": "7113115000",
                "origin": "CA",
                "name": "Sterling silver jewellery earrings"
            },
            "JWL-MON-EAR-SN": {
                "hs": "7113115000",
                "origin": "CA",
                "name": "Sterling silver jewellery earrings"
            },
            "MTH-AUT-25": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "AC-TB-EB-24": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "MTH-BCP-25": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "AC-TB-CH-24": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "MNT-ELD-25": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "AC-TB-EF-24": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "MTB-FAW-25": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "AC-TB-LI-24": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "AC-TB-AU-24": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "MNT-MFL-25": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "AC-TB-MO-24": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "AC-TB-NI-24": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "MNT-PLG-25": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "MTH-RIV-25": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "STK-TAB-RWO": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "MNT-SCA-25": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "MNT-SNP-25": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "AC-TB-TL-24": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "MNT-WIN-25": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "AC-TB-WO-24": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "STK-TAB-WIS": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "STK-TAB-WDL": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "JWL-LAR-BRC-GLD-14": {
                "hs": "7113115000",
                "origin": "CA",
                "name": "Sterling silver jewellery bracelet"
            },
            "JWL-LAR-BRC-GLD": {
                "hs": "7113115000",
                "origin": "CA",
                "name": "Sterling silver jewellery bracelet"
            },
            "JWL-LAR-BRC-SLV": {
                "hs": "7113115000",
                "origin": "CA",
                "name": "Sterling silver jewellery bracelet"
            },
            "BRC-MED-SGP": {
                "hs": "7113115000",
                "origin": "CA",
                "name": "Sterling silver jewellery bracelet"
            },
            "JWL-MED-BRC-GLD": {
                "hs": "7113115000",
                "origin": "CA",
                "name": "Sterling silver jewellery bracelet"
            },
            "JWL-MED-BRC-SLV": {
                "hs": "7113115000",
                "origin": "CA",
                "name": "Sterling silver jewellery bracelet"
            },
            "BRC-SML-GLP": {
                "hs": "7113115000",
                "origin": "CA",
                "name": "Sterling silver jewellery bracelet"
            },
            "JWL-SMA-BRC-GLD": {
                "hs": "7113115000",
                "origin": "CA",
                "name": "Sterling silver jewellery bracelet"
            },
            "JWL-SMA-BRC-SLV": {
                "hs": "7113115000",
                "origin": "CA",
                "name": "Sterling silver jewellery bracelet"
            },
            "DOT-CHA-HA5-MFL": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-WIT-HA5-MFL": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-CHB-HB5-PHASE": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "DOT-WIT-HB5-PHASE": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "DOT-CHB-HTN-PHASE": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "DOT-CHB-HTN-PHASE-2": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-CHA-HA5-MFL70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-WIT-HA5-MFL70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-CHA-HA5-MNF-2": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-WIT-HA5-MNF-2": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-CHB-HB5-PHASE-2": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "GRP-WIT-HB5-PHASE-2": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "GRP-CHB-HTN-PHASE-2": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-CHA-HA5-MFL70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-WIT-HA5-MFL70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-CHA-HA5-MNF": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-WIT-HA5-MNF": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-CHB-HB5-PHASE": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "GRP-WIT-HB5-PHASE": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "GRP-CHB-HTN-PHASE": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-CHA-HA5-MNF": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-WIT-HA5-MNF": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-CHA-HA5-MRS": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-WIT-HA5-MRS": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-CHB-HB5-MOON": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "DOT-WIT-HB5-MOON": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "DOT-CHB-HTN-MOON": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-CHA-HA5-MRS70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-WIT-HA5-MRS70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-CHA-HA5-MRS": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-WIT-HA5-MRS": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-CHB-HB5-MOON": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "GRP-WIT-HB5-MOON": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "GRP-CHB-HTN-MOON": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-CHA-HA5-MRS70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-WIT-HA5-MRS70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-CHA-HA5-MRS": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-WIT-HA5-MRS": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-FWN-HA5-MUS": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-MOS-HA5-MUS": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-SCA-HA5-MUS": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-FWN-HB5-MUSH": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "DOT-MOS-HB5-MUSH": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "DOT-SCO-HB5-MUSH": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "DOT-FWN-HTN-MUSH": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-MOS-HTN-MUSH": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-FWN-HA5-MUS70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-MOS-HA5-MUS70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-SCA-HA5-MUS70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-FWN-HA5-MUS": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-MOS-HA5-MUS": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-SCA-HA5-MUS": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-FWN-HB5-MUSH": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "GRP-MOS-HB5-MUSH": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "GRP-SCO-HB5-MUSH": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "GRP-FWN-HTN-MUSH": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-MOS-HTN-MUSH": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-FWN-HA5-MUS70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-MOS-HA5-MUS70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-SCA-HA5-HOF70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-FWN-HA5-MUS": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-MOS-HA5-MUS": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-SCA-HA5-MUS": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DLP-UND-BLO": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "DEF": {
                "hs": "4820102020",
                "origin": "CA",
                "name": "Notepad"
            },
            "INS-DB-CL-DIS": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INS-HL-PG": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INS-A5-PG": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "NP-PF": {
                "hs": "4820102020",
                "origin": "CA",
                "name": "Notepad"
            },
            "DOT-BSM-HA5-ROG": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-WIN-HA5-ROG": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-BLF-HB5-ROG": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "DOT-WDI-HB5-ROG": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "DOT-BLF-HTN-ROG": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-BLF-HA5-ROG70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-WDI-HA5-ROG70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-RIV-HA5-ROG": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-BLF-HB5-ROG": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "GRP-WDI-HB5-ROG": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "GRP-BLF-HTN-ROG": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-BLF-HA5-ROG70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-WDI-HA5-ROG70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-RIV-HA5-ROG": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-WDI-HA5-ROG": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "SHAD-DEF": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "DOT-A5-ENF": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-A5-WDL": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-A5-ECF": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-GRD-A5-WDL": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-LIN-A5-ECF-AA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "NTB-LIN-A5-WDL-AA": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-CHA-HA5-SOL": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-WIT-HA5-SOL": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-CHB-HB5-SOL": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "DOT-WIT-HB5-SOL": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "DOT-CHB-HTN-SOL": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-CHA-HA5-SOL-2": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-WIT-HA5-SOL-2": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-CHA-HA5-SOL": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-WIT-HA5-SOL": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-CHB-HB5-SOL": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "GRP-WIT-HB5-SOL": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "GRP-CHB-HTN-SOL": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-CHA-HA5-SOL70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-WIT-HA5-SOL70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-CHA-HA5-SOL": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-WIT-HA5-SOL": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "STCK-WF-SUN": {
                "hs": "7113115000",
                "origin": "CA",
                "name": "Sterling silver jewellery pendants"
            },
            "STK-SQB-AUT": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "AC-SM-RO": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "AC-SM-MA": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "STK-SQB-DAH": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "STK-SQB-DPO": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "AC-SM-FE": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "STK-SQB-FWN": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "AC-SM-LI": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "AC-SM-MO": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "STK-SQB-MOS": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "STK-SQB-NIM": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "STK-SQB-PLG": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "AC-SM-RI": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "STK-SQB-RWO": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "STK-SQB-OAK": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "HLS-SNP-25": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "AC-SM-LR": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "STK-SQB-WIN": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "STK-SQB-WOR": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "AC-SM-WI": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "STK-SQB-WDL": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "DOT-CHA-HA5-STL": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-WIT-HA5-STL": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-CHB-HB5-STAR": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "DOT-WIT-HB5-STAR": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "DOT-CHB-HTN-STAR": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-CHA-HA5-STL70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "DOT-WIT-HA5-STL70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-CHA-HA5-STL": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-WIT-HA5-STL": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-CHB-HB5-STAR": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "GRP-WIT-HB5-STAR": {
                "hs": "4820102030",
                "origin": "CA",
                "name": "Notebook (sewn journal, B5 size)"
            },
            "GRP-CHB-HTN-STAR": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-CHA-HA5-STL70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "GRP-WIT-HA5-STL70": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-CHA-HA5-STL": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "LIN-WIT-HA5-STL": {
                "hs": "4820102060",
                "origin": "CA",
                "name": "Notebook (bound journal)"
            },
            "TASK-DEF": {
                "hs": "4820102020",
                "origin": "US",
                "name": "Sticky notepad"
            },
            "TASK-DEF-AB": {
                "hs": "4820102020",
                "origin": "CA",
                "name": "Sticky notepad"
            },
            "AC-TM-HY": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "AC-TM-LA": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "TMG-SNT-25": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "STK-TMG-SMT": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "AC-BP": {
                "hs": "4820102020",
                "origin": "US",
                "name": "Notepad"
            },
            "INS-HPC-UD": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INS-HL-UD": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INS-A5-UD": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INS-A5-UND-A5X": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INS-CL-UND-CLA": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INS-HL-UND-HAL": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "DPL-CHB-UCF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "DPL-ENF-UCF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "DPL-FWN-UCF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "DPL-MON-UCF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "DPL-MOS-UCF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "DPL-RIV-UCF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "DPL-AUT-UHC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "DPL-BLF-UHC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "DPL-BTC-UHC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "DPL-CHB-UHC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "DPL-ENF-UHC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "DPL-FWN-UHC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "DPL-MON-UHC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "DPL-MOS-UHC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "DPL-RIV-UHC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "DPL-SCA-UHC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "DPL-SNP-UHC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "DPL-WIL-UHC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "DPL-WDL-UHC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "DPL-CHB-UPF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "DPL-MOS-UPF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "DPL-RIV-UPF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "DPL-SCA-UPF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "HPL-CHB-UCF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "HPL-ENF-UCF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "HPL-FWN-UCF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "HPL-MON-UCF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "HPL-MOS-UCF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "HPL-RIV-UCF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "HPL-AUT-UHC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "HPL-BLF-UHC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "HPL-BTC-UHC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "HPL-CHB-UHC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "HPL-ENF-UHC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "HPL-FWN-UHC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "HPL-MON-UHC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "HPL-MOS-UHC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "HPL-RIV-UHC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "HPL-SCA-UHC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "HPL-SNP-UHC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "HPL-WIL-UHC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "HPL-WDL-UHC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "HPL-CHB-UPF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "HPL-MOS-UPF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "HPL-RIV-UPF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "HPL-SCA-UPF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "INS-HPC-UMC": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INS-HL-UMC": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INS-A5-UMC": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "VPL-CHB-UCF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "VPL-ENF-UCF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "VPL-FWN-UCF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "VPL-MON-UCF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "VPL-MOS-UCF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "VPL-RIV-UCF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "VPL-AUT-UHC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "VPL-BLF-UHC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "VPL-BTC-UHC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "VPL-CHB-UHC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "VPL-ENF-UHC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "VPL-FWN-UHC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "VPL-MON-UHC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "VPL-MOS-UHC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "VPL-RIV-UHC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "VPL-SCA-UHC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "VPL-SNP-UHC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "VPL-WIL-UHC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "VPL-WDL-UHC": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "VPL-CHB-UPF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "VPL-MOS-UPF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "VPL-RIV-UPF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "VPL-SCA-UPF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WDP-CHB-UCF7": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WDP-AST-UCF7": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WDP-ENF-UCF7": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WDP-FWN-UCF7": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WDP-MON-UCF7": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WDP-MOS-UCF7": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WDP-RIV-UCF7": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WDP-AUT-UH70": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WDP-BLF-UH70": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WDP-BTC-UH70": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WDP-CHB-UH70": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WDP-AST-UH70": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WDP-ENF-UH70": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WDP-FWN-UH70": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WDP-MON-UH70": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WDP-MOS-UH70": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WDP-RIV-UH70": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WDP-SCA-UH70": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WDP-SNP-UH70": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WDP-WIL-UH70": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WDP-WIT-UH70": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WDP-WDL-UH70": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WDP-CHB-UPF7": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WDP-MOS-UPF7": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WDP-RIV-UPF7": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "WDP-SCA-UPF7": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "INS-HL-UW": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INS-HPC-UW": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "INS-A5-UW": {
                "hs": "4820900000",
                "origin": "CA",
                "name": "Planner inserts (loose refills)"
            },
            "UW-SC-23-AR": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "UW-SC-23-DF": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "UW-SC-23-HY": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "UW-SC-23-OK": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "UW-SC-23-SG": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "UW-SC-23-WR": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Planner agenda (bound diary)"
            },
            "NP-WT": {
                "hs": "4820102010",
                "origin": "CA",
                "name": "Notepad"
            },
            "STCK-WEEK": {
                "hs": "4820102020",
                "origin": "CA",
                "name": "Sticky notepad"
            },
            "WNS-HYD-25": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "WNS-LKS-25": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "WNS-SNS-25": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "WNS-SMS-25": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            },
            "THRE-THR": {
                "hs": "4911998000",
                "origin": "CA",
                "name": "Paper sticker"
            }
    };

    // Standardized customs descriptions
    const STANDARD_DESCRIPTIONS = {
        'planner': 'Planner agenda (bound diary)',
        'notebook_bound': 'Notebook (bound journal)',
        'notebook_b5': 'Notebook (sewn journal, B5 size)',
        'notepad': 'Notepad',
        'sticky': 'Sticky notepad',
        'sticker': 'Paper sticker',
        'pen': 'Gel ink pen',
        'inserts': 'Planner inserts (loose refills)',
        'tape': 'Decorative tape',
        'pocket': 'Paper pocket for notebook',
        'charm': 'Sterling silver jewellery bracelet',
        'bracelet': 'Sterling silver jewellery bracelet',
        'earrings': 'Sterling silver jewellery earrings',
        'jewelry': 'Sterling silver jewellery'
    };

    // Generic fallback SKUs by category
    const FALLBACK_SKUS = {
        'Planner agenda (bound diary)': 'WK-DEF-AB',
        'Notepad': 'DEF',
        'Sticky notepad': 'STCK-HABIT',
        'Paper sticker': 'LIST-DEF',
        'Notebook (bound journal)': 'NTB-DOT-A5-DAH-IM',
        'Notebook (sewn journal, B5 size)': 'NTB-DOT-B5-DAH-IM',
        'Planner inserts (loose refills)': 'INS-A5-25OV',
        'Gel ink pen': 'PEN-BRASS',
        'Decorative tape': 'WASHI-DEFAULT',
        'Sterling silver jewellery bracelet': 'JWL-SMA-BRC-GLD',
        'Sterling silver jewellery earrings': 'JWL-14K-EAR-GLD-14',
        'Paper pocket for notebook': 'STCK-WF-MOON'
    };

    // Description matching rules (from original script)
    const DESCRIPTION_RULES = {
        'planner agenda': ['planner'],
        'notebook (bound journal)': ['notebook', ['A5', 'TN']],
        'notebook (sewn journal, B5': ['notebook', 'B5'],
        'notepad': ['notepad'],
        'sticky notepad': ['stickies', 'sticky'],
        'paper sticker': ['sticker', 'stickers', 'botanical', 'wellness', 'solstice', 'finance', 'tabs', 'highlight'],
        'gel ink pen': ['brass', 'pen'],
        'planner inserts': ['inserts'],
        'decorative tape': ['washi', 'tape', 'MT Washi'],
        'journal': ['notebook', 'dotted', 'graph', 'lined'],
        'transparent pocket': ['pocket', 'transparent'],
        'charm': ['charm', 'bracelet', 'jewelry']
    };

    // Function to detect correct description from product name
    function detectCorrectDescription(productName) {
        const lowerName = productName.toLowerCase();

        // Check for planners
        if (lowerName.includes('planner') || lowerName.includes('daily') ||
            lowerName.includes('weekly') || lowerName.includes('combo')) {
            return STANDARD_DESCRIPTIONS.planner;
        }

        // Check for notebooks
        if (lowerName.includes('notebook') || lowerName.includes('journal')) {
            if (lowerName.includes('b5') || lowerName.includes('sewn')) {
                return STANDARD_DESCRIPTIONS.notebook_b5;
            }
            return STANDARD_DESCRIPTIONS.notebook_bound;
        }

        // Check for stickers
        if (lowerName.includes('sticker') || lowerName.includes('botanical') ||
            lowerName.includes('wellness') || lowerName.includes('highlight') ||
            lowerName.includes('tab')) {
            return STANDARD_DESCRIPTIONS.sticker;
        }

        // Check for sticky notes
        if (lowerName.includes('sticky') || lowerName.includes('habit tracker')) {
            return STANDARD_DESCRIPTIONS.sticky;
        }

        // Check for notepads
        if (lowerName.includes('notepad') || lowerName.includes('note pad')) {
            return STANDARD_DESCRIPTIONS.notepad;
        }

        // Check for inserts
        if (lowerName.includes('insert') || lowerName.includes('refill')) {
            return STANDARD_DESCRIPTIONS.inserts;
        }

        // Check for pens
        if (lowerName.includes('pen') || lowerName.includes('brass') || lowerName.includes('aluminum')) {
            return STANDARD_DESCRIPTIONS.pen;
        }

        // Check for tape
        if (lowerName.includes('washi') || lowerName.includes('tape')) {
            return STANDARD_DESCRIPTIONS.tape;
        }

        // Check for jewelry
        if (lowerName.includes('charm') || lowerName.includes('bracelet')) {
            return STANDARD_DESCRIPTIONS.bracelet;
        }
        if (lowerName.includes('earring')) {
            return STANDARD_DESCRIPTIONS.earrings;
        }

        // Check for pockets
        if (lowerName.includes('pocket') || lowerName.includes('transparent')) {
            return STANDARD_DESCRIPTIONS.pocket;
        }

        return null; // No match found
    }

    // Function to check if description is valid
    function isValidDescription(description) {
        const validDescriptions = Object.values(STANDARD_DESCRIPTIONS);
        return validDescriptions.some(valid =>
            description.toLowerCase().includes(valid.toLowerCase())
        );
    }

    // Function to get fallback SKU for a description
    function getFallbackSKU(description) {
        // Try exact match first
        if (FALLBACK_SKUS[description]) {
            return FALLBACK_SKUS[description];
        }

        // Try partial match
        for (const [key, sku] of Object.entries(FALLBACK_SKUS)) {
            if (description.toLowerCase().includes(key.toLowerCase())) {
                return sku;
            }
        }

        return 'DEF'; // Ultimate fallback
    }

    // Visual indicator
    function showIndicator(message, color = '#28a745') {
        const existing = document.querySelector('#sku-indicator');
        if (existing) existing.remove();

        const indicator = document.createElement('div');
        indicator.id = 'sku-indicator';
        indicator.textContent = message;
        indicator.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10001;
            background: ${color};
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: bold;
            font-size: 14px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(indicator);

        setTimeout(() => {
            if (indicator.parentNode) {
                indicator.style.opacity = '0';
                indicator.style.transition = 'opacity 0.5s';
                setTimeout(() => indicator.remove(), 500);
            }
        }, 3000);
    }

    // Get current order identifier
    function getCurrentOrderId() {
        const orderNumber = document.querySelector('.order-number, [class*="order-number"], [class*="orderNumber"]');
        if (orderNumber) {
            return orderNumber.textContent.trim();
        }

        const url = window.location.href;
        const match = url.match(/orderId=([^&]+)/);
        return match ? match[1] : url;
    }

    // Check if this is a domestic order
    function isDomesticOrder() {
        const addressElements = document.querySelectorAll('[class*="address"], [class*="shipping"], [class*="destination"]');
        for (const elem of addressElements) {
            const text = elem.textContent.toUpperCase();
            if (text.includes('UNITED STATES') || text.includes(', US') || text.includes('USA')) {
                const customsSection = document.querySelector('.custom-declaration-qQ_1P6U');
                if (!customsSection) {
                    return true;
                }
            }
        }
        return false;
    }

    // Wait for element
    function waitForElement(selector, timeout = 5000) {
        return new Promise((resolve, reject) => {
            const element = document.querySelector(selector);
            if (element) {
                resolve(element);
                return;
            }

            const startTime = Date.now();
            const checkInterval = setInterval(() => {
                const element = document.querySelector(selector);
                if (element) {
                    clearInterval(checkInterval);
                    resolve(element);
                } else if (Date.now() - startTime > timeout) {
                    clearInterval(checkInterval);
                    reject(new Error(`Timeout waiting for ${selector}`));
                }
            }, 100);
        });
    }

    // Check if product matches customs description
    function productMatchesDescription(productName, customsDescription) {
        const prodLower = productName.toLowerCase();
        const descLower = customsDescription.toLowerCase();

        for (const [descPattern, keywords] of Object.entries(DESCRIPTION_RULES)) {
            if (descLower.includes(descPattern)) {
                if (Array.isArray(keywords[0])) {
                    const primaryKeyword = keywords[0];
                    const secondaryKeywords = keywords[1];

                    const hasPrimary = primaryKeyword.some(k => prodLower.includes(k.toLowerCase()));
                    const hasSecondary = Array.isArray(secondaryKeywords)
                        ? secondaryKeywords.some(k => prodLower.includes(k.toLowerCase()))
                        : prodLower.includes(secondaryKeywords.toLowerCase());

                    if (hasPrimary && hasSecondary) return true;
                } else {
                    const matches = keywords.some(keyword =>
                        prodLower.includes(keyword.toLowerCase())
                    );
                    if (matches) return true;
                }
            }
        }

        return false;
    }

    // Set value in React input
    function setReactInputValue(input, value) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            'value'
        ).set;

        nativeInputValueSetter.call(input, value);

        const event = new Event('input', { bubbles: true });
        input.dispatchEvent(event);

        const changeEvent = new Event('change', { bubbles: true });
        input.dispatchEvent(changeEvent);

        input.focus();
        input.blur();
    }

    // Get shipment items
    function getShipmentItems() {
        const items = [];
        const itemRows = document.querySelectorAll('.react-table-body-row-icH4FVD');

        itemRows.forEach((row) => {
            const cells = row.querySelectorAll('[role="cell"]');

            if (cells.length >= 6) {
                const skuElement = cells[0].querySelector('.item-sku-ONq0BTI');
                let sku = '';
                if (skuElement) {
                    sku = skuElement.textContent.replace('SKU:', '').trim();
                }

                const nameElement = cells[0].querySelector('.item-name-E__ZAJW');
                const name = nameElement ? nameElement.textContent.trim() : '';

                let unitPrice = 0;
                const priceText = cells[2].textContent.trim();
                if (priceText) {
                    unitPrice = parseFloat(priceText.replace(/[^0-9.]/g, ''));
                }

                let quantity = 1;
                const qtyText = cells[3].textContent.trim();
                if (qtyText) {
                    quantity = parseInt(qtyText) || 1;
                }

                let totalPrice = 0;
                const totalText = cells[5].textContent.trim();
                if (totalText) {
                    totalPrice = parseFloat(totalText.replace(/[^0-9.]/g, ''));
                }

                if (sku) {
                    const customsPrice = unitPrice === 0 ? 1.00 : unitPrice;

                    items.push({
                        name: name,
                        sku: sku,
                        unitPrice: unitPrice,
                        customsPrice: customsPrice,
                        quantity: quantity,
                        totalPrice: totalPrice,
                        isFree: unitPrice === 0,
                        used: false
                    });
                }
            }
        });

        return items;
    }

    // Main fill function with description correction
    function fillCustomsDeclarations(callback) {
        console.log('🔍 Processing order...');

        const shipmentItems = getShipmentItems();
        if (shipmentItems.length === 0) {
            console.log('❌ No shipment items found');
            if (callback) callback(false);
            return;
        }

        shipmentItems.forEach(item => item.used = false);

        const allDeclarations = document.querySelectorAll('.custom-declaration-qQ_1P6U');
        const visibleDeclarations = Array.from(allDeclarations).filter(block => {
            const rect = block.getBoundingClientRect();
            return rect.height > 0 && rect.width > 0;
        });

        if (visibleDeclarations.length === 0) {
            console.log('⚠️ No customs declarations found');
            if (callback) callback(false);
            return;
        }

        let filledCount = 0;
        let fixedDescriptions = 0;

        visibleDeclarations.forEach((block, index) => {
            const descriptionInput = block.querySelector('input[aria-label="Description"]');
            const priceInput = block.querySelector('input[aria-label="Item Value(ea)"]');
            const quantityInput = block.querySelector('input[aria-label="Quantity"]');
            const skuInput = block.querySelector('input[aria-label="SKU"]');

            if (!priceInput || !priceInput.value) return;

            const customsDescription = descriptionInput?.value || '';
            const declarationPrice = parseFloat(priceInput.value) || 0;
            const quantity = parseInt(quantityInput?.value) || 1;
            const currentSKU = skuInput?.value || '';

            // Find matching shipment item
            const priceMatches = shipmentItems.filter(item =>
                !item.used &&
                Math.abs(item.customsPrice - declarationPrice) < 0.01
            );

            let matchingItem = null;

            if (priceMatches.length === 1) {
                matchingItem = priceMatches[0];
            } else if (priceMatches.length > 1) {
                matchingItem = priceMatches.find(item =>
                    item.quantity === quantity &&
                    productMatchesDescription(item.name, customsDescription)
                ) || priceMatches.find(item =>
                    productMatchesDescription(item.name, customsDescription)
                ) || priceMatches.find(item =>
                    item.quantity === quantity
                ) || priceMatches[0];
            }

            if (matchingItem) {
                // **FIX DESCRIPTION IF INVALID**
                if (descriptionInput && !isValidDescription(customsDescription)) {
                    const correctDescription = detectCorrectDescription(matchingItem.name);
                    if (correctDescription) {
                        console.log(`📝 Fixing description: "${customsDescription}" → "${correctDescription}"`);
                        setReactInputValue(descriptionInput, correctDescription);
                        fixedDescriptions++;

                        setTimeout(() => {
                            descriptionInput.style.backgroundColor = '#dbeafe';
                            setTimeout(() => {
                                descriptionInput.style.backgroundColor = '';
                            }, 2000);
                        }, 100);
                    }
                }

                // **FILL OR FIX SKU**
                if (skuInput) {
                    let skuToUse = matchingItem.sku;

                    // Check if SKU exists in CUSMA database
                    const skuUpper = skuToUse.toUpperCase();
                    if (!CUSMA_DATABASE[skuUpper]) {
                        // SKU not found - use fallback
                        const updatedDescription = descriptionInput?.value || customsDescription;
                        const fallbackSKU = getFallbackSKU(updatedDescription);
                        console.log(`⚠️ SKU "${skuToUse}" not in CUSMA - using fallback: ${fallbackSKU}`);
                        skuToUse = fallbackSKU;
                    }

                    // Only update if SKU is missing or different
                    if (!currentSKU || currentSKU !== skuToUse) {
                        matchingItem.used = true;
                        setReactInputValue(skuInput, skuToUse);

                        setTimeout(() => {
                            if (skuInput.value === skuToUse) {
                                filledCount++;
                                skuInput.style.backgroundColor = '#d4edda';
                                setTimeout(() => {
                                    skuInput.style.backgroundColor = '';
                                }, 2000);
                            }
                        }, 100);
                    }
                }
            }
        });

        setTimeout(() => {
            const message = `✅ Filled ${filledCount} SKUs${fixedDescriptions > 0 ? ` | Fixed ${fixedDescriptions} descriptions` : ''}`;
            console.log(message);
            showIndicator(message);
            if (callback) callback(filledCount > 0 || fixedDescriptions > 0);
        }, 200);
    }

    // Navigate to next order
    function clickNextButton() {
        const selectors = [
            '.next-button-UCWUb4l',
            'button[aria-label="Navigate to next order"]',
            '[class*="next"][class*="button"]:not([disabled])',
            'button:not([disabled])[class*="next"]'
        ];

        let nextButton = null;
        for (const selector of selectors) {
            nextButton = document.querySelector(selector);
            if (nextButton && !nextButton.disabled) break;
        }

        if (!nextButton || nextButton.disabled) {
            console.log('✅ No next button - batch complete');
            showIndicator('🎉 Batch Complete!', '#6f42c1');
            autoMode = false;
            updateButtonState();
            return false;
        }

        console.log('➡️ Clicking next button...');
        showIndicator('➡️ Next Order...', '#007bff');
        nextButton.click();
        return true;
    }

    // Auto-process function
    async function autoProcess() {
        if (isProcessing) {
            console.log('⏸️ Already processing, skipping duplicate call');
            return;
        }

        if (!autoMode) {
            console.log('🛑 Auto mode disabled');
            return;
        }

        const newOrderId = getCurrentOrderId();

        if (currentOrderId !== newOrderId) {
            console.log('📄 New order detected:', newOrderId);
            currentOrderId = newOrderId;
            processedThisPage = false;
            retryCount = 0;
        }

        if (processedThisPage) {
            console.log('⏭️ Already processed, skipping');
            return;
        }

        isProcessing = true;
        console.log('🔄 Starting auto-process...');

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            if (isDomesticOrder()) {
                console.log('🏠 Domestic order - skipping');
                showIndicator('🏠 Domestic - Skipped', '#17a2b8');
                processedThisPage = true;
                isProcessing = false;

                await new Promise(resolve => setTimeout(resolve, 1000));
                if (autoMode) {
                    clickNextButton();
                }
                return;
            }

            let customsFound = false;
            try {
                await waitForElement('.custom-declaration-qQ_1P6U', CUSTOMS_WAIT_TIME);
                customsFound = true;
                console.log('✅ Customs section found');
            } catch (error) {
                console.log('⚠️ No customs found - treating as domestic');
                showIndicator('🏠 No Customs - Skipped', '#17a2b8');
                processedThisPage = true;
                isProcessing = false;

                await new Promise(resolve => setTimeout(resolve, 1000));
                if (autoMode) {
                    clickNextButton();
                }
                return;
            }

            if (customsFound) {
                await new Promise(resolve => setTimeout(resolve, 800));

                const filled = await new Promise((resolve) => {
                    fillCustomsDeclarations((success) => {
                        resolve(success);
                    });
                });

                console.log(`✅ Fill result: ${filled}`);
                processedThisPage = true;
                isProcessing = false;

                await new Promise(resolve => setTimeout(resolve, 2000));
                if (autoMode) {
                    clickNextButton();
                }
            }

        } catch (error) {
            console.error('❌ Error in autoProcess:', error);
            showIndicator('❌ Error - Skipping', '#e74c3c');
            processedThisPage = true;
            isProcessing = false;

            await new Promise(resolve => setTimeout(resolve, 1000));
            if (autoMode) {
                clickNextButton();
            }
        }
    }

    // Watch for URL/page changes
    let lastUrl = window.location.href;
    const urlObserver = new MutationObserver(() => {
        const currentUrl = window.location.href;
        if (currentUrl !== lastUrl) {
            console.log('🔄 URL changed, resetting flags');
            lastUrl = currentUrl;
            processedThisPage = false;
            isProcessing = false;

            if (autoMode) {
                setTimeout(() => {
                    if (autoMode && !isProcessing) {
                        autoProcess();
                    }
                }, 1000);
            }
        }
    });

    urlObserver.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Update button appearance
    function updateButtonState() {
        const button = document.querySelector('#sku-filler-button');
        if (button) {
            if (autoMode) {
                button.textContent = '⏸️ Stop Auto-Fill';
                button.style.background = 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)';
            } else {
                button.textContent = '🚀 Smart Fill SKUs';
                button.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            }
        }
    }

    // Create buttons
    function createButtons() {
        const existingButton = document.querySelector('#sku-filler-button');
        if (existingButton) existingButton.remove();

        const button = document.createElement('button');
        button.id = 'sku-filler-button';
        button.textContent = '🚀 Smart Fill SKUs';
        button.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 10000;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            font-size: 14px;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            transition: all 0.3s;
        `;

        button.addEventListener('click', () => {
            if (autoMode) {
                autoMode = false;
                isProcessing = false;
                console.log('🛑 Auto-mode stopped');
                showIndicator('⏸️ Stopped', '#e74c3c');
            } else {
                fillCustomsDeclarations();
            }
            updateButtonState();
        });

        const autoButton = document.createElement('button');
        autoButton.textContent = '🔄 Auto Mode';
        autoButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 180px;
            z-index: 10000;
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            font-size: 14px;
            box-shadow: 0 4px 15px rgba(40, 167, 69, 0.4);
            transition: all 0.3s;
        `;

        autoButton.addEventListener('click', () => {
            autoMode = !autoMode;
            processedThisPage = false;
            isProcessing = false;
            retryCount = 0;

            if (autoMode) {
                console.log('🚀 Auto-mode started');
                currentOrderId = getCurrentOrderId();
                showIndicator('🚀 Auto-mode ON!', '#28a745');
                autoProcess();
            } else {
                console.log('🛑 Auto-mode stopped');
                showIndicator('⏸️ Stopped', '#e74c3c');
            }
            updateButtonState();
        });

        document.body.appendChild(button);
        document.body.appendChild(autoButton);
    }

    // Initialize
    setTimeout(createButtons, 1000);

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'S') {
            e.preventDefault();
            fillCustomsDeclarations();
        }
        if (e.ctrlKey && e.shiftKey && e.key === 'A') {
            e.preventDefault();
            autoMode = !autoMode;
            processedThisPage = false;
            isProcessing = false;
            retryCount = 0;

            if (autoMode) {
                currentOrderId = getCurrentOrderId();
                showIndicator('🚀 Auto-mode ON!', '#28a745');
                autoProcess();
            } else {
                showIndicator('⏸️ Stopped', '#e74c3c');
            }
            updateButtonState();
        }
        if (e.ctrlKey && e.shiftKey && e.key === 'N') {
            e.preventDefault();
            clickNextButton();
        }
    });

    console.log('✅ SKU Auto-Filler v12.0 loaded - with description cleaning and SKU fallbacks');

})();
Sessions
Active
No sessions

let’s git together and code
Pls Continue
Claude Code | Claude
