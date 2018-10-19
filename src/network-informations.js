import { assign } from 'lodash'

export function withConnectionStats(callback, peerConnection){
  if (!peerConnection){
    var RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;

    if (!RTCPeerConnection) {
      var iframe = document.getElementById('iframe');
      
      if (!iframe) {
        return;
      }

      var win = iframe.contentWindow;
      RTCPeerConnection = win.RTCPeerConnection || win.mozRTCPeerConnection || win.webkitRTCPeerConnection;
    }

    peerConnection = new RTCPeerConnection(null);
    peerConnection.createDataChannel('webrtchacks');

    peerConnection.createOffer(
      function (offer) {
        peerConnection.setLocalDescription(offer);
      },
      function (err) {
        console.error(err);
      }
    );
  }

  peerConnection.onicecandidate = function (event) {
    if (!event.candidate) {
      peerConnection.getStats(callback)
    }
  };
}

export function localCandidateAttributes(result){
  let data = {}
      
  result.map(item => item.names().map(name => {
    if (item.type == 'localcandidate'){
      assign(data, { [name]: item.stat(name) })
    }
  }))

  return data
}

export function allAttributes(result){
  let data = {}
      
  result.map(item => item.names().map(name => {
    assign(data, { [name]: item.stat(name) })
  }))

  return data
}
