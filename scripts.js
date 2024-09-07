document.addEventListener('DOMContentLoaded', () => {
    const monthSelect = document.getElementById('monthSelect');
    const tableBody = document.querySelector('#attendanceTable tbody');

    function populateTable(month) {
        const filteredData = attendanceData.filter(entry => entry.TanggalAbsen.startsWith(`${month}/`));
        tableBody.innerHTML = '';

        filteredData.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.Timestamp}</td>
                <td>${entry.NIM || '-'}</td>
                <td>${entry.NamaLengkap || '-'}</td>
                <td>${entry.Kegiatan || '-'}</td>
                <td>${entry.Keterangan || '-'}</td>
                <td>${entry.TanggalAbsen || '-'}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    monthSelect.addEventListener('change', (event) => {
        const selectedMonth = event.target.value;
        populateTable(selectedMonth);
    });

    // Initialize with the first month
    populateTable(monthSelect.value);
});

function printTable() {
    const printWindow = window.open('', '', 'height=600,width=800');
    const table = document.getElementById('attendanceTable').outerHTML;
    const selectedMonth = document.getElementById('monthSelect').selectedOptions[0].text;

    printWindow.document.write('<html><head><title>Print Table</title>');
    printWindow.document.write('<link rel="stylesheet" type="text/css" href="styles.css">');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<div class="print-header">');
    printWindow.document.write('<h1>REKAP ABSENSI MAHASISWA KKN</h1>');
    printWindow.document.write('<h2>DESA AIKMEL UTARA</h2>');
    printWindow.document.write('<h3>BULAN ' + selectedMonth + '</h3>');
    printWindow.document.write('</div>');
    printWindow.document.write(table);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
}
