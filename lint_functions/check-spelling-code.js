var dictionary = require('dictionary-en')
var nspell = require('nspell')
var exceptions = ['eventId', 'eventType', 'eventTime', 'eventSubscriptionId', 'publicAddress', 'IPv4', 'subnet', 'privateAddress', 'publicPort', 'sessionId', 'UUID', 'devicePorts', 'QoS', 'qosProfile', 'TCP', 'UDP', 'QOS_S', 'QOS_M', 'QOS_L', 'QOS_E', 'webhook', 'notificationUrl', 'notificationAuthToken', 'startedAt', 'expiresAt', 'qosprofiles', 'minDuration', 'maxDuration', 'packetDelayBudget', 'oneway', 'endtoend', 'jitter', 'roundtrip', 'ITU', 'Y1540', 'eg', 'realtime', 'packetErrorLossRate', '10N'', '5G', '3GPP', 'QCI', 'maxDownstreamRate', 'QOS_STATUS_CHANGED', 'qosStatus', 'statusInfo', 'DURATION_EXPIRED', 'Enduser', 'IoT', 'sensorsactuators', 'ipv4Address', 'ipv6Address', 'phoneNumber', 'networkAccessIdentifier', 'MNO', 'invoker', 'MNOs', 'MSISDN', 'E164', 'GPSI', 'IdentifierDomain', 'DNS', 'ie', 'NAT64', 'IPv6', 'applicationServerPorts', 'maxDownstreamBurstRate', 'maxUpstreamRate', 'Ipv6Address', 'QoD', 'cmunication', 'QualityOnDemand', 'Telco', 'indepth', '4G5G', 'Telecom', 'VRGaming', 'backend', 'OverviewhttpsrawgithubusercontentcomcamaraprojectQualityOnDemandmaindocumentationAPI_documentationresourcesQoD_latency_overviewPNG', '24hrs', 'QOD', 'OAuth', 'andor', 'AppFlow', 'portranges', 'AppFlows', 'portportranges', 'Appflow', 'br', 'APIhttpsrawgithubusercontentcomcamaraprojectQualityOnDemandmaindocumentationAPI_documentationresourcesQoD_detailsPNG', 'CAMARA', 'DRAFThttpsgithubcomcamaraprojectQualityOnDemandblobmaindocumentationAPI_documentationQoSProfile_Mapping_Tablemd', 'IETF', '5952', 'addressmask', 'v6', 'applicationServer', 'dottedquad', 'sessionssessionId', 'createSession', 'targetMinUpstreamRate', 'SessionId', 'SessionInfo', 'EventNotification', 'PhoneNumber', 'DeviceIpv4Addr', 'SingleIpv4Addr', 'Ipv4Address', 'QosStatus', 'EventQosStatus', 'ErrorInfo', 'GBR', 'latencysensitive', 'DOCSIS', '31', 'maxUpstreamBurstRate', 'targetMinDownstreamRate', 'qosprofilesname', 'RateUnitEnum', 'CreateSession', 'PortsSpec', 'QosProfile', 'QosProfileName', 'TimeUnitEnum', 'QosProfileStatusEnum', 'EventId', 'EventType', 'EventTime', 'QosStatusChangedEvent', 'eventDetail', 'NETWORK_TERMINATED', 'StatusInfo', 'ApplicationServer', 'NetworkAccessIdentifier'];
var separatorsRegex = /\s/     // any whitespace
var mistakes = [];

function includesNumber(value) {
    return [0-9]+[0-9].test(value);
}
export default (input) =>{
    dictionary(ondictionary);
    function ondictionary(err, dict) {
      if (err) {
        throw err
      }
        var spell = nspell(dict)
        var no_special_characters= input.replace(/[^\w\s]/gi, '')
        const words = no_special_characters.replace(/`/g, '').split(separatorsRegex);
        
        mistakes.push(words
          .filter((word) => !exceptions.includes(word))
          .filter((word) => !spell.correct(word))
          .filter((word) => word!='')
          .filter((word) => !includesNumber(word)));
        
        if (mistakes.length > 0) {
            console.log("MISTAKES:        " + mistakes);
            return [{message: 'Spelling mistakes found: ' + mistakes}];
        }
    }
};
