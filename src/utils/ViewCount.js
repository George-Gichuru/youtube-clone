const viewCount = (views) => {
    if (views === undefined) return;
    let arr_num = Array.from(views?.toString()).map(Number);
    if (arr_num.length < 4) {
      return `${views}`;
    }
    let modu_arr = arr_num.length % 3;
    if (modu_arr === 0) {
      let new_arr = arr_num.length / 3;
      if (new_arr === 1) {
        return `${views}`;
      } else if (new_arr === 2) {
        let final = arr_num.splice(0, 3).join('');
        return `${final}K`;
      } else if (new_arr === 3) {
        let final = arr_num.splice(0, 3).join('');
  
        return `${final}M`;
      } else if (new_arr === 4) {
        let final = arr_num.splice(0, 3).join('');
        return `${final}B`;
      }
    } else {
      let oddOnes = arr_num.splice(0, modu_arr).join('');
      let reminder_len = arr_num.length;
      if (reminder_len === 3) {
        let final = `${oddOnes}K`;
        return final;
      } else if (reminder_len === 6) {
        let final = `${oddOnes}M`;
        return final;
      } else if (reminder_len === 9) {
        let final = `${oddOnes}B`;
        return final;
      }
    }
  };
  
  export default viewCount;