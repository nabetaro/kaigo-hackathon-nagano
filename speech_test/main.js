(function() {
    window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
    var recognition = new window.SpeechRecognition();
    recognition.lang = 'ja-JP';
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.maxAlternatives = 4;

        var box = document.getElementById('result_text');
        var status = document.getElementById('status');
        var flag_speech = 0;
        var offs = 0;
        var spans = [];
 
        function vr_function() {
 
            recognition.onstart = function() {
//console.info( "開始");
                status.innerText = "開始";
            };
            recognition.onaudiostart = function() {
//console.info( "audio start");
                status.innerText = "audio start";
            };
            recognition.onsoundstart = function() {
//console.info( "認識中");
                status.innerText = "認識中";
            };
            recognition.onspeechstart = function() {
//console.info( "speech start");
                status.innerText = "speech start";
            };

 
            recognition.onresult = function(event) {
                var results = event.results;
                for (var i = event.resultIndex; i < results.length; i++) {
                    if( spans.length < i + offs + 1){
                        var span = document.createElement( 'span');
                        box.append( span);
                        spans.push( span);
                    }
                    if (results[i].isFinal)
                    {
//console.info( 'FIN ' + i + ': ' + results[i][0].transcript);
                        spans[i + offs].classList.remove( "ing" );
                        spans[i + offs].innerText = results[i][0].transcript;
                    }
                    else
                    {
                        var text = [].slice.call(results[i]).map( v => v.transcript).join( ' | ');
//console.info( i + ': ' + text);
                        status.innerText = "[途中経過]" + text;
                        spans[i + offs].classList.add( "ing" );
                        spans[i + offs].innerText = '[ ' + text + ' ]';
                    }
                }
            }
            recognition.onnomatch = function() {
//console.info( "もう一度試してください");
                status.innerText = "もう一度試してください";
            };

            recognition.onerror = function() {
//console.info( "エラー");
                status.innerText = "エラー";
//                if(flag_speech == 1)
//                  vr_function();
            };

            recognition.onspeechend = function() {
//console.info( "speech end");
                status.innerText = "speech end";
            };
            recognition.onsoundend = function() {
//console.info( "停止中");
                status.innerText = "停止中";
            };
            recognition.onaudioend = function() {
//console.info( "audio end");
                status.innerText = "audio end";
            };
            recognition.onend = function() {
//console.info( "停止");
                status.innerText = "停止";
                var br = document.createElement( 'br');
                box.append( br);
                if(flag_speech == 1)
                  vr_function();
            };


//console.info( "開始中");
            status.innerText = "開始中";
            offs = spans.length;
            recognition.start();
        }

    document.getElementById("recBtn").onclick = function() {
      if( flag_speech === 0){
        flag_speech = 1;
        document.getElementById("recBtn").innerText = 'マイク 停止';
        vr_function();
      } else {
        recognition.stop();
        document.getElementById("recBtn").innerText = 'マイク 開始';
        flag_speech = 0;
      }
    };
})();
