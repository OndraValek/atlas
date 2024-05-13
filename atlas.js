year.innerText = new Date().getFullYear();
// Funkce pro zobrazení států dle vybraného kontinentu
function showCountriesByContinent(continent) {
    staty.innerHTML = ''; // Vymažeme aktuální obsah

    fetch(`https://restcountries.com/v3.1/region/${continent}`)
        .then((response) => response.json())
        .then((data) => {
            data.forEach(stat => {
                let blockCountry = `
                <div class="col-xl-2 col-lg-10 col-md-10 col-sm-10 lol">
                    <div class="card">
                        <a href="${stat.maps.googleMaps}">
                            <img class="card-img-top" src="${stat.flags.png}" 
                            alt="${stat.name.official}" />
                        </a>
                        <div class="card-body">
                            <h4 class="card-title"><a href="#" class="country-link">${stat.translations.ces.common}</a></h4>
                            <p class="card-text">Počet obyvatel: ${stat.population}
                                <br>Rozloha: ${stat.area} km<sup>2</sup>
                            </p>
                        </div>
                    </div>                   
                </div>`;
                staty.innerHTML += blockCountry;
            });

            // Přidání událostního posluchače pro kliknutí na jméno státu
            const countryLinks = document.querySelectorAll('.country-link');
            countryLinks.forEach(link => {
                link.addEventListener('click', function(event) {
                    event.preventDefault(); // Zabraňuje výchozímu chování odkazu
                    const index = Array.from(countryLinks).indexOf(link);
                    const selectedStat = data[index];
                    showModalWithCountryInfo(selectedStat.translations.ces.common, selectedStat.population, selectedStat.area);
                });
            });
        });
}





// Funkce pro automatické zobrazení států pro kontinent Evropa po načtení stránky
document.addEventListener('DOMContentLoaded', function() {
    showCountriesByContinent('europe');
});

document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
        const continent = this.getAttribute('data-continent');
        showCountriesByContinent(continent);
    });
});
// Funkce pro zobrazení modálního okna s informacemi o státu
function showModalWithCountryInfo(name, population, area) {
    const modalTitle = document.getElementById('modal-title');
    const modalInfo = document.getElementById('modal-info');

    modalTitle.textContent = name;
    modalInfo.innerHTML = `Počet obyvatel: ${population}<br>Rozloha: ${area} km<sup>2</sup>`;

    // Zobrazení modálního okna
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';

    // Přidání událostního posluchače pro zavření modálního okna po kliknutí na ikonu "X"
    const closeBtn = document.getElementsByClassName('close')[0];
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Přidání událostního posluchače pro zavření modálního okna po kliknutí mimo okno
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}