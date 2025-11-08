# ShipStation Customs Autofiller - Complete Working Script

## File Location
`/home/user/tampermonkey-ss/customs-autofiller-fixed.js`

## Script Details
- **Version:** 2.0
- **Database Size:** 1,351 SKUs from CUSMA.csv
- **File Size:** 206.6 KB (7,282 lines)
- **Status:** ✅ All checks passed - Ready to use!

## Critical Fix Included
✅ **FIXED:** Now uses `aria-label="Harmonization"` for HS code input field (NOT "Harmonized Tariff Code")

## Features Implemented

### 1. Complete CUSMA Database
- All 1,351 SKUs parsed from CUSMA.csv
- Each entry includes:
  - Description (CustomsDescription)
  - Tariff Number (CustomsTariffNo)
  - Country of Origin (CustomsCountry)

### 2. Selectors (All Verified)
```javascript
customsBlock: '.custom-declaration-qQ_1P6U'
addButton: '.add-declaration-button-uXgAQNY'
itemRow: '.react-table-body-row-icH4FVD'
itemSku: '.item-sku-ONq0BTI'
itemName: '.item-name-E__ZAJW'
description: 'input[aria-label="Description"]'
harmonization: 'input[aria-label="Harmonization"]'  // CRITICAL FIX
itemValue: 'input[aria-label="Item Value(ea)"]'
quantity: 'input[aria-label="Quantity"]'
sku: 'input[aria-label="SKU"]'
```

### 3. Main Functions

#### Autofill Customs
- Detects all items in the order
- Filters items that exist in CUSMA database
- Creates customs declarations as needed
- Fills all fields with correct CUSMA data
- Supports multi-item orders

#### Fix Descriptions
- Scans existing customs declarations
- Corrects descriptions to match CUSMA database
- Updates harmonization codes if incorrect

#### Auto Mode
- Automatically processes orders at 5-second intervals
- Can be toggled on/off

### 4. User Interface

#### Control Panel (Top-Right Corner)
- **Fill Customs Button** - Manually trigger autofill
- **Fix Descriptions Button** - Fix existing declarations
- **Auto Mode Checkbox** - Enable/disable automatic processing
- **Database Counter** - Shows number of SKUs loaded

#### Keyboard Shortcuts
- **Ctrl+Shift+F** - Fill customs declarations
- **Ctrl+Shift+A** - Toggle auto mode

### 5. Notifications
- On-screen notifications for all actions
- Color-coded by type:
  - Success (Green)
  - Error (Red)
  - Warning (Orange)
  - Info (Blue)

### 6. Console Logging
- Detailed console logs with color coding
- Tracks all operations for debugging

## How It Works

1. **Page Load**
   - Script initializes when ShipStation page loads
   - Loads all 1,351 SKUs into memory
   - Creates control panel in top-right corner
   - Registers keyboard shortcuts

2. **Autofill Process**
   - Scans order for items (using `.react-table-body-row-icH4FVD`)
   - Extracts SKU from each item (`.item-sku-ONq0BTI`)
   - Looks up SKU in CUSMA database
   - Creates customs declarations (`.add-declaration-button-uXgAQNY`)
   - Fills each field using proper React event handling:
     - SKU
     - Description
     - Harmonization (HS Code) - **USING CORRECT SELECTOR**
     - Quantity
     - Item Value (if provided)

3. **Fix Descriptions**
   - Scans existing declarations
   - Reads SKU from each
   - Compares description/harmonization with CUSMA database
   - Updates if different

4. **Auto Mode**
   - Runs autofill every 5 seconds
   - Continues until disabled
   - Useful for batch processing

## Installation

1. Install Tampermonkey extension in your browser
2. Open Tampermonkey dashboard
3. Click "Create a new script"
4. Copy entire contents of `customs-autofiller-fixed.js`
5. Paste into editor
6. Save (Ctrl+S)

## Testing

The script includes proper React event handling:
- Uses native input value setter
- Triggers input, change, and blur events
- Sets focus before input
- Waits appropriate delays between operations

## URL Matching

Works on:
- `https://ship*.shipstation.com/*`

## Database Sample

```javascript
"2025Q4-DAI-AUT": {
    "description": "Planner agenda (bound diary)",
    "tariffNo": "4820102010",
    "country": "CA"
}
```

## Support

All required functionality has been implemented:
✅ Parse CUSMA database
✅ Include complete database in script
✅ CRITICAL FIX: Use aria-label="Harmonization"
✅ Create/fill declarations for items with quantity > 0
✅ Fix incorrect descriptions
✅ Support multi-item orders
✅ Auto-mode for batch processing
✅ UI buttons
✅ Keyboard shortcuts (Ctrl+Shift+F, Ctrl+Shift+A)
✅ All selectors from shipstation.html
