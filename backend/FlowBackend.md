# ⚙️ Ang Pagkakasunod-sunod (Backend Request Flow)

Ang seksyong ito ay nagpapaliwanag kung paano naglalakbay ang isang request mula sa frontend patungo sa iba't ibang parte ng ating backend.

## 1. app.js (Ang Entry Point)

Dito nag-uumpisa ang lahat at ito ang utak ng application mo.

- Pagka-start ng server, binabasa nito ang mga configurations at middlewares.
- Dito rin tinatawag ang koneksyon sa database.
- Kapag may pumasok na request mula sa frontend, si app.js ang unang sasalubong nito at ipapasa sa tamang ruta.

## 2. db.js (Ang Database Connection)

Kinokonekta nito ang app mo sa iyong database (hal. MongoDB, MySQL).

- Karaniwan itong ini-import at pinapatakbo sa loob ng app.js bago mag-start makinig ang server sa mga requests.
- Sinasiguro nitong gumagana ang database bago may mag-extract o mag-save ng data.

## 3. routes (Ang Traffic Cop)

Dito nakatira ang mga URL paths o endpoints (hal. /api/users, /api/products).

- Tinitingnan nito kung anong HTTP method ang ginamit (GET, POST, PUT, DELETE)
- Kapag tugma ang URL, hindi si routes ang nagpoproseso ng logic; sa halip, ipapasa lang niya ang request sa tamang Controller.

## 4. controllers (Ang Tagaproseso ng Logic)

Dito nagaganap ang totoong trabaho at "business logic".

- Sila ang nakikipag-usap sa database (gamit ang iyong mga models) para mag-save, mag-delete, o kumuha ng data.
- Matapos maproseso ang data, ang controller din ang magbabalik ng response (res.send o res.json) pabalik sa frontend ng user.
