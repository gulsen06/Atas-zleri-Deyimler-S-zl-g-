const sonuc = document.getElementById("sonuc");
const aramaListesi = document.getElementById("aramaListesi");
const aramaKutusu = document.getElementById("aramaKutusu");

const anahtarKelimeler = [];
const sozler = [];

const verileriYukle = async () => {
  const gelen = await fetch("https://sozluk.gov.tr/atasozu");
  const veri = await gelen.json();
  console.log(veri);

  veri.forEach((eleman) => {
    anahtarKelimeler.push(eleman.anahtar);
    sozler.push(eleman.sozum);
  });

  const birlesmisKelimeler = [...new Set(anahtarKelimeler)];
  console.log(birlesmisKelimeler);

  birlesmisKelimeler.forEach((kelime) => {
    const yeni = document.createElement("option");
    aramaListesi.appendChild(yeni);
    yeni.value = kelime;
  });
};
aramaKutusu.addEventListener("input", () => {
  sonuclariAra(aramaKutusu.value);
});

function sonuclariAra(arananKelime) {
  sonuc.innerHTML = "";
  let eslesenler = [];

  if (arananKelime.length >= 3) {
    eslesenler = sozler.filter((soz) =>
      soz.toLowerCase().includes(arananKelime.toLowerCase())
    );
  }
  console.log(eslesenler);
  eslesenler.forEach((es) => {
    const siradakiSonuc = document.createElement("li");
    sonuc.appendChild(siradakiSonuc);
    siradakiSonuc.textContent = es;
  });
  console.log(eslesenler);
}
verileriYukle();
