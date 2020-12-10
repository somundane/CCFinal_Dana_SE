let row = 0; //out of 4
let col = 0; //(out of 6)
let done = false
let st = false;
let c;
let cant = false;
//row and col are start r and c are end
function setupDoors() {
    let r, c;
    r = int(random(0, 4))
    c = int(random(0, 9))

    if(done == false) {
        if(st == false) {
            //set random start position
            row = int(random(0, 4))
            col = int(random(0, 9))
            //make sure it's valid
            if(rooms[row][col].dir != "n" && rooms[row][col].door != null) {
                st = true
            }
            //otherwise stay in loop
        }
        //once we have row and col (aka start position)
        else {
            if(r >= row - 1 && r <= row -1 || c >= col-2 && c <=col+2) {
                r = int(random(0, 4))
                c = int(random(0, 9))
            }
            //see if not n
            if(rooms[r][c].dir != "n" && rooms[r][c].door != null && rooms[r][c].dir != undefined) {
                end = {
                    row: r,
                    col: c
                }
                done = true;
            } // otherwise run again
        }  
    }

}
//
//  if(done == false) {
//    if(st == false) {
//      row = int(random(0, 4))
//      col = int(random(0, 9))
//      if(rooms[row][col].dir == "n" || rooms[row][col].door == null || rooms[row][col].door == undefined || rooms[row][col].color == undefined){
//        row = int(random(0, 4))
//        col = int(random(0, 9))
//      }
//      else if(rooms[row][col].dir != "n") {
//        st = true;
//      }
//    }
//      //once we have the random r and c check against em?
//    else {
//      if(r == row || (r >= row-1 && r <=row+1))  {
//        r = int(random(0, 4))
//        done = false;
//      }
//      else done = true
//      if(c == col|| (c >= col-2 && c <=col+2)) {
//        c = int(random(0, 9))
//        done = false
//      }
//      else done = true
//      
//      end = {
//        row: r,
//        col: c
//      }
//    }
//  }
//}
function limitDoors() {
    if(row<0) row = 0
    if(row>3) row = 3
    if(col<0) col = 0
    if(col >8) col = 8
}

function moveUp() {
  if(rooms[row][col].dir.includes("u")) {
    row-=1
    cant = false
  }
  else
    cant = true;
}
function moveDown() {
  if(rooms[row][col].dir.includes("d")) {
    cant = false
    row+=1
  }
  else
     cant = true;
}
function moveLeft() {
  if(rooms[row][col].dir.includes("l")) {
    if(rooms[row][col].sl!=null)
    col -=rooms[row][col].sl
    col -= 1
    cant = false
  }
  else
     cant = true;

}
function moveRight() {
  if(rooms[row][col].dir.includes("r")) {
    if(rooms[row][col].sr!=null)
    col +=rooms[row][col].sr
    col += 1
    cant = false
  }
  else
     cant = true;
}
let rooms =[
  [{dir:"rd", door:3, color:"w"}, {dir:"lrd", door:4, color:"y"}, {dir:"lrd", door:4, color:"w"}, {dir:"lrd", door:4, color:"g"}, {dir:"lrd", door:3, color:"y", sr: 2}, {dir:"n"}, {dir:"n"}, {dir:"lrd", door:3, color:"y", sl: 2}, {dir:"ld", door:2, color:"g"}],
  [{dir:"ud", door:2, color:"g"}, {dir:"ud", door:2, color:"g"}, {dir:"ur", door:4, color:"w", sr: 2}, {dir:"ur", door:4, color:"w", sr: 1, sl:1}, {dir:"ur", door:4, color:"w",sl: 2}, {dir:"lr", door:2, color:"w"}, {dir:"ld", door:2, color:"g"}, {dir:"ur", door:2, color:"y"}, {dir:"lud", door:3, color:"y"}],
  
    [{dir:"udr", door:4, color:"y", sr:1}, {dir:"udr", door:4, color:"y", sl:1}, {dir:"lrd", door:3, color:"w"}, {dir:"lrd", door:3, color:"y"}, {dir:"ld", door:2, color:"g", sr:1}, {dir:"n"}, {dir:"ur", door:2, color:"y", sl:1}, {dir:"lrd", door:3, color:"w"}, {dir:"lud", door:3, color:"w"}],
    
  [{dir:"ur", door:2, color:"w", sr:1}, {dir:"ur", door:2, color:"w", sl:1}, {dir:"lu", door:2, color:"g"}, {dir:"ru", door:2, color:"g"}, {dir:"lru", door:3, color:"y", sr:1}, {dir:"n"}, {dir:"lr", door:2, color:"w", sl: 1}, {dir:"lru", door:3, color:"y"}, {dir:"lu", door:2, color:"g"}]
]