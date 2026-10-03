# 🌐 Ang Pagkakasunod-sunod (Frontend Request Flow)

Ang seksyong ito ay nagpapaliwanag kung paano nag-uumpisa ang aksyon mula sa screen ng user patungo sa pagtawag sa backend, hanggang sa pagpapakita muli ng resulta.

## 1. Views / Components (Ang UI o Nakikita ng User)

Dito nag-uumpisa ang lahat ng aksyon sa frontend. Ito ang mga buttons, forms, o pages (hal. Login.jsx, ProductList.vue).

- **Flow:** Kapag may clinick o tinype ang user (hal. clinick ang "Submit" button), magti-trigger ang isang function o event handler.

## 2. Services / API Folder (Ang Backend Messenger)

Sa magandang structure, hindi direktang nagre-request ang component sa backend. Gumagawa tayo ng hiwalay na folder (karaniwang tinatawag na services o api, hal. api/userService.js).

- **Flow:** Dito nakasulat ang mga HTTP Requests gamit ang fetch o axios na siyang kakausap sa mga routes ng backend mo.

- **Tugma sa Backend:** Kung ang backend mo ay nakikinig sa `/api/users`, ang service file na ito ang tatawag sa tamang URL (hal. http: //localhost :3000/api/users).

## 3. State Management / Context / Hooks (Ang Tagatago ng Data - Optional pero Recommended)

Taga-hawak ito ng impormasyon habang bukas ang application ng user.

- **Flow:** Kapag nag-reply ang backend controller (nagpadala ng res.json), tatanggapin ito ng service file at ipapasa sa State (hal. useState sa React o Pinia/Vuex sa Vue).
- **Update sa Memory:** Binabago nito ang data sa memorya ng app para malaman ng frontend na may bagong data na pumasok.

## 4. Views / Components (Pagbabago sa Screen)

Ito ang huling yugto kung saan nakikita ng user ang resulta ng kanyang ginawa.

- **Flow:** Kapag pumasok na ang bagong data sa state, kusa itong magre-render sa screen.
- **Resulta:** Dito na makikita ng user ang mga mensahe tulad ng "Login Successful!" o ang updated na listahan ng mga produkto.
