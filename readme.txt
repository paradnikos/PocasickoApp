PočasíčkoApp
PočasíčkoApp je single page aplikace pro zobrazení aktuálního počasí a 5denní předpovědi pro zadanou lokalitu. Aplikace využívá API OpenWeatherMap pro získání údajů o počasí a nabízí funkcionalitu pro zobrazení návrhů měst na základě uživatelského vstupu.

Funkcionality
Zobrazení aktuálního počasí v zadaném městě.
Zobrazení 5denní předpovědi počasí.
Automatické návrhy měst při zadávání do vyhledávacího pole.
Podpora různých jazyků a formátování data podle velikosti obrazovky.

Jak spustit
Klonování repozitáře
Nejprve si klonujte repozitář do svého lokálního prostředí:
git clone https://github.com/paradnikos/PocasickoApp.git

API klíč
Vytvořte si účet na OpenWeatherMap a získejte svůj API klíč. Nahraďte API_KEY v souboru script.js vaším skutečným API klíčem.
const app = new PocasickoApp('API_KEY_HERE');

Otevřete projekt
Otevřete soubor index.html v libovolném moderním webovém prohlížeči.

Podporované prohlížeče
Google Chrome
Mozilla Firefox
Microsoft Edge

Struktura projektu
index.html: Hlavní HTML soubor obsahující strukturu webové aplikace.
styly.css: Stylovací soubor obsahující všechny CSS styly pro aplikaci.
readme.txt: Textový soubor s popissem a strukturou PocasickoApp
script.js: Obsahuje hlavni třídu PocasickoApp, ktera zodpovídá za načítání měst a počasí, zobrazení aktuálního počásí a předpovědi.

initialize(): Nastavuje posluchače událostí pro interakce uživatele.
showSuggestions(): Zpracovává zobrazení našeptávače návrhů měst
getWeather(): Načítá data o počasí a spouští zobrazovací metody.
displayWeather(): Zpracovává zobrazení aktuálních podmínek počasí.
displayForecast(): Zobrazuje 5denní předpověď počasí jako tabulku.
cityFromJson(): Načítá a zpracovává seznam měst z lokálního JSON souboru (city.list.json).