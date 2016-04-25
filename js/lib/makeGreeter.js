/**
 * Created by blakers757 on 3/31/2016.
 */

function makeGreeter(greeting, punc){
    punc = punc || "!";

    return function(sender){
        return sender.trim() + " says " + greeting.trim() + punc.trim();
    };
}

module.exports = makeGreeter;
