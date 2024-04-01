import './clash-style.css';
import { db, getDatabase } from "./local-database";

(async () => {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div>
      Sorry, for security reasons I took Clash! down on the old Render site.</br>
      All of the Battle-System extension are now hosted at Battle-System.com. </br>
      You can export your data here, and import again using the Clash! link in the OBR store.
      <button id="exporter">Export Clash! Collection</button>
    </div>
  `;

  await getDatabase();
  db.Ready();

  const button = document.getElementById('exporter') as HTMLButtonElement;
  button.onclick = async () => {
    await DownloadCollection();
  };

  async function DownloadCollection() {
    const content = await db.Creatures.toArray();

    var a = document.createElement("a");
    var file = new Blob([JSON.stringify(content)], { type: "text/plain" });
    a.href = URL.createObjectURL(file);
    a.download = `ClashCollectionExport-${Date.now()}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
})();
