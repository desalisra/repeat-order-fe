// tampilan angka supaya tampil dengan separator ribuan
// untuk tampilan yang di ketik belum berhasil
export const glbNumberFormat = (amount) => {
    if (amount === '' || amount === undefined || amount === 0  || amount === '0' || amount === null) {
      return amount;
    } 
    else {
      return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
};

// merubah format tanggal inputan menjadi dd MMM yyyy
export const glbFormatDate = (e) => {
    const date = new Date(e);

    let monthNames =["Jan","Feb","Mar","Apr",
                     "May","Jun","Jul","Aug",
                     "Sep", "Oct","Nov","Dec"];
    
    let day = date.getDate();
  
    let monthIndex = date.getMonth();
    let monthName = monthNames[monthIndex];
    
    let year = date.getFullYear(); 
  
    let newDate = `${day}-${monthName}-${year}`;  
    return newDate;
  };
// export default glbFormatDate;