// --------------------------
//--------- GLOBALS----------
// --------------------------

$(document).ready(function() {
    const freshDeck = createDeck();
    var theDeck = freshDeck;
    var playersHand = [];
    var dealersHand = [];
    function createDeck() {
        var newDeck = [];
        const suits = ['h', 's', 'd', 'c'];
        for (let s = 0; s < suits.length; s++) {
            for (let c = 1; c <= 13; c++) {
                newDeck.push(c + suits[s]);
            }
        }
        return newDeck;
    }

    $('.deal-button').click(function() {
        // console.log("User clicked Deal!");
        theDeck = shuffleDeck();
        playersHand.push(theDeck.shift());
        dealersHand.push(theDeck.shift());
        playersHand.push(theDeck.shift());
        dealersHand.push(theDeck.shift());
        placeCard('player', 1, playersHand[0]);
        placeCard('dealer', 1, dealersHand[0]);
        placeCard('player', 2, playersHand[1]);
        placeCard('dealer', 2, dealersHand[1]);

        calculateTotal(playersHand,'player')
        calculateTotal(dealersHand,'dealer')

        console.log(playersHand);
        console.log(dealersHand);
    });

    $('.hit-button').click(function() {
        playersHand.push(theDeck.shift());
        placeCard('player',playersHand.length,playersHand[playersHand.length-1]);
        calculateTotal(playersHand, 'player');
        
    })

    $('.stand-button').click(function() {
        var dealerTotal = calculateTotal(dealersHand, 'dealer');
        while(dealerTotal < 17) {
            dealersHand.push(theDeck.shift());
            placeCard('dealer',dealersHand.length, dealersHand[dealersHand.length-1]);
            dealerTotal = calculateTotal(dealersHand, 'dealer');
        }
        chackWin();
    })

    function checkWin() {
        var playerTotal = calculateTotal(playersHand, 'player');
        var delaerTotal = calculateTotal(dealersHand, 'dealer');
        // if player > 21 ... play busts and loses
        // if dealer > 21 ... dealer busts and loses
        if playersHand.length = 2 AND playertotal = 21 ... BlackJack!
        if dealersHand.length = 2 AND dealertotal = 21 ... BlackJack!
        // if player > dealer ... player wins
        // if dealer > player ... dealer wins
        // else tie
    }

    function calculateTotal(hand, who) {
        var total = 0;
        var thisCardValue = 0;
        for (i = 0; i < hand.length; i++) {
            thisCardValue = Number(hand[i].slice(0,-1));
            total += thisCardValue;
        }
        console.log(total);
        var classSelector = '.' + who + '-total';
        $(classSelector).html(total);
        return total;
    }

    function placeCard(who, where, cardToPlace) {
        var classSelector = '.' + who + '-cards .card-' + where;
        $(classSelector).html('<img src="cards/'+cardToPlace+'.png">');
    };

    function shuffleDeck() {
        for(let i = 0; i < 50000; i++) {
            var randomCard1 = Math.floor(Math.random() * theDeck.length);
            var randomCard2 = Math.floor(Math.random() * theDeck.length);
            var temp = theDeck[randomCard1];
            theDeck[randomCard1] = theDeck[randomCard2];
            theDeck[randomCard2] = temp;
        }
        return theDeck;
    }

});


