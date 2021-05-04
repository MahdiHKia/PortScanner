import React, {useState, useEffect} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    useLocation
} from "react-router-dom";
import {
    Navbar,
    NavbarBrand,
    InputGroup,
    Button,
    InputGroupAddon,
    Input,
    Card, Badge
} from 'reactstrap';
import {withScriptjs, GoogleMap, Marker, withGoogleMap} from "react-google-maps";
import {Col, Row, Form, FormGroup, Label} from 'reactstrap';

export default function App(props) {
    return (
        <>
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand color="light" light expand="md">PORT SCAN DB</NavbarBrand>
                </Navbar>
            </div>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route path="/search">
                        <Search {...props}/>
                    </Route>
                </Switch>
            </Router>
        </>
    );
}


function Home() {
    const [query, setQuery] = useState('');
    const history = useHistory();
    const submit = () => {
        history.push("/search?q=" + query);
    }
    return (
        <InputGroup className="position-fixed" style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: 400
        }}>
            <InputGroupAddon addonType="prepend">
                <Button color="danger">IP</Button>
            </InputGroupAddon>
            <Input placeholder="0.0.0.0" onChange={e => setQuery(e.target.value)} onKeyDown={e => {
                if (e.key === 'Enter') {
                    submit();
                }
            }}/>
            <InputGroupAddon addonType="append">
                <Button color="success" onClick={submit}>Search</Button>
            </InputGroupAddon>
        </InputGroup>

    );
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

let sample_data = [
    {
        "id": 1,
        "open_ports": [
            {
                "port_number": 17,
                "common_usage": "qotd"
            },
            {
                "port_number": 39,
                "common_usage": "rlp"
            },
            {
                "port_number": 21,
                "common_usage": "ftp"
            },
            {
                "port_number": 42,
                "common_usage": "nameserver"
            },
            {
                "port_number": 43,
                "common_usage": "nicname"
            },
            {
                "port_number": 11,
                "common_usage": "systat"
            },
            {
                "port_number": 19,
                "common_usage": "chargen"
            },
            {
                "port_number": 107,
                "common_usage": "rtelnet"
            },
            {
                "port_number": 67,
                "common_usage": "bootps"
            },
            {
                "port_number": 37,
                "common_usage": "time"
            },
            {
                "port_number": 68,
                "common_usage": "bootpc"
            },
            {
                "port_number": 69,
                "common_usage": "tftp"
            },
            {
                "port_number": 70,
                "common_usage": "gopher"
            },
            {
                "port_number": 53,
                "common_usage": "domain"
            },
            {
                "port_number": 80,
                "common_usage": "http"
            },
            {
                "port_number": 81,
                "common_usage": "hosts2-ns"
            },
            {
                "port_number": 88,
                "common_usage": "kerberos"
            },
            {
                "port_number": 101,
                "common_usage": "hostname"
            },
            {
                "port_number": 118,
                "common_usage": "sqlserv"
            },
            {
                "port_number": 79,
                "common_usage": "finger"
            },
            {
                "port_number": 543,
                "common_usage": "klogin"
            },
            {
                "port_number": 110,
                "common_usage": "pop3"
            },
            {
                "port_number": 111,
                "common_usage": "sunrpc"
            },
            {
                "port_number": 517,
                "common_usage": "talk"
            },
            {
                "port_number": 102,
                "common_usage": "iso-tsap"
            },
            {
                "port_number": 109,
                "common_usage": "pop2"
            },
            {
                "port_number": 119,
                "common_usage": "nntp"
            },
            {
                "port_number": 150,
                "common_usage": "sql-net"
            },
            {
                "port_number": 113,
                "common_usage": "auth"
            },
            {
                "port_number": 530,
                "common_usage": "courier"
            },
            {
                "port_number": 135,
                "common_usage": "epmap"
            },
            {
                "port_number": 531,
                "common_usage": "conference"
            },
            {
                "port_number": 389,
                "common_usage": "ldap"
            },
            {
                "port_number": 162,
                "common_usage": "snmptrap"
            },
            {
                "port_number": 561,
                "common_usage": "monitor"
            },
            {
                "port_number": 507,
                "common_usage": "crs"
            },
            {
                "port_number": 143,
                "common_usage": "imap"
            },
            {
                "port_number": 194,
                "common_usage": "irc"
            },
            {
                "port_number": 512,
                "common_usage": "exec"
            },
            {
                "port_number": 156,
                "common_usage": "sqlsrv"
            },
            {
                "port_number": 158,
                "common_usage": "pcmail-srv"
            },
            {
                "port_number": 161,
                "common_usage": "snmp"
            },
            {
                "port_number": 518,
                "common_usage": "ntalk"
            },
            {
                "port_number": 500,
                "common_usage": "isakmp"
            },
            {
                "port_number": 170,
                "common_usage": "print-srv"
            },
            {
                "port_number": 179,
                "common_usage": "bgp"
            },
            {
                "port_number": 544,
                "common_usage": "kshell"
            },
            {
                "port_number": 213,
                "common_usage": "ipx"
            },
            {
                "port_number": 322,
                "common_usage": "rtsps"
            },
            {
                "port_number": 532,
                "common_usage": "netnews"
            },
            {
                "port_number": 349,
                "common_usage": "mftp"
            },
            {
                "port_number": 443,
                "common_usage": "https"
            },
            {
                "port_number": 548,
                "common_usage": "afpovertcp"
            },
            {
                "port_number": 464,
                "common_usage": "kpasswd"
            },
            {
                "port_number": 522,
                "common_usage": "ulp"
            },
            {
                "port_number": 513,
                "common_usage": "login"
            },
            {
                "port_number": 560,
                "common_usage": "rmonitor"
            },
            {
                "port_number": 514,
                "common_usage": "cmd"
            },
            {
                "port_number": 540,
                "common_usage": "uucp"
            },
            {
                "port_number": 525,
                "common_usage": "timed"
            },
            {
                "port_number": 526,
                "common_usage": "tempo"
            },
            {
                "port_number": 529,
                "common_usage": "irc-serv"
            },
            {
                "port_number": 533,
                "common_usage": "netwall"
            },
            {
                "port_number": 613,
                "common_usage": "hmmp-op"
            },
            {
                "port_number": 568,
                "common_usage": "ms-shuttle"
            },
            {
                "port_number": 554,
                "common_usage": "rtsp"
            },
            {
                "port_number": 556,
                "common_usage": "remotefs"
            },
            {
                "port_number": 546,
                "common_usage": "dhcpv6-client"
            },
            {
                "port_number": 547,
                "common_usage": "dhcpv6-server"
            },
            {
                "port_number": 550,
                "common_usage": "new-rwho"
            },
            {
                "port_number": 636,
                "common_usage": "ldaps"
            },
            {
                "port_number": 569,
                "common_usage": "ms-rome"
            },
            {
                "port_number": 990,
                "common_usage": "ftps"
            },
            {
                "port_number": 612,
                "common_usage": "hmmp-ind"
            },
            {
                "port_number": 563,
                "common_usage": "nntps"
            },
            {
                "port_number": 565,
                "common_usage": "whoami"
            },
            {
                "port_number": 691,
                "common_usage": "msexch-routing"
            },
            {
                "port_number": 593,
                "common_usage": "http-rpc-epmap"
            },
            {
                "port_number": 749,
                "common_usage": "kerberos-adm"
            },
            {
                "port_number": 750,
                "common_usage": "kerberos-iv"
            },
            {
                "port_number": 800,
                "common_usage": "mdbs_daemon"
            },
            {
                "port_number": 666,
                "common_usage": "doom"
            },
            {
                "port_number": 1034,
                "common_usage": "activesync"
            },
            {
                "port_number": 1109,
                "common_usage": "kpop"
            },
            {
                "port_number": 1711,
                "common_usage": "pptconference"
            },
            {
                "port_number": 994,
                "common_usage": "ircs"
            },
            {
                "port_number": 995,
                "common_usage": "pop3s"
            },
            {
                "port_number": 989,
                "common_usage": "ftps-data"
            },
            {
                "port_number": 992,
                "common_usage": "telnets"
            },
            {
                "port_number": 1155,
                "common_usage": "nfa"
            },
            {
                "port_number": 993,
                "common_usage": "imaps"
            },
            {
                "port_number": 1478,
                "common_usage": "ms-sna-base"
            },
            {
                "port_number": 1270,
                "common_usage": "opsmgr"
            },
            {
                "port_number": 1433,
                "common_usage": "ms-sql-s"
            },
            {
                "port_number": 1110,
                "common_usage": "nfsd-status"
            },
            {
                "port_number": 1434,
                "common_usage": "ms-sql-m"
            },
            {
                "port_number": 1167,
                "common_usage": "phone"
            },
            {
                "port_number": 1524,
                "common_usage": "ingreslock"
            },
            {
                "port_number": 1731,
                "common_usage": "msiccp"
            },
            {
                "port_number": 1607,
                "common_usage": "stt"
            },
            {
                "port_number": 1755,
                "common_usage": "ms-streaming"
            },
            {
                "port_number": 1512,
                "common_usage": "wins"
            },
            {
                "port_number": 1723,
                "common_usage": "pptp"
            },
            {
                "port_number": 1944,
                "common_usage": "close-combat"
            },
            {
                "port_number": 1701,
                "common_usage": "l2tp"
            },
            {
                "port_number": 2234,
                "common_usage": "directplay"
            },
            {
                "port_number": 1812,
                "common_usage": "radius"
            },
            {
                "port_number": 1813,
                "common_usage": "radacct"
            },
            {
                "port_number": 1863,
                "common_usage": "msnp"
            },
            {
                "port_number": 1745,
                "common_usage": "remote-winsock"
            },
            {
                "port_number": 1801,
                "common_usage": "msmq"
            },
            {
                "port_number": 2049,
                "common_usage": "nfsd"
            },
            {
                "port_number": 2383,
                "common_usage": "ms-olap4"
            },
            {
                "port_number": 2106,
                "common_usage": "mzap"
            },
            {
                "port_number": 2177,
                "common_usage": "qwave"
            },
            {
                "port_number": 2393,
                "common_usage": "ms-olap1"
            },
            {
                "port_number": 2053,
                "common_usage": "knetd"
            },
            {
                "port_number": 2394,
                "common_usage": "ms-olap2"
            },
            {
                "port_number": 2382,
                "common_usage": "ms-olap3"
            },
            {
                "port_number": 7,
                "common_usage": "echo"
            },
            {
                "port_number": 9,
                "common_usage": "discard"
            },
            {
                "port_number": 13,
                "common_usage": "daytime"
            },
            {
                "port_number": 20,
                "common_usage": "ftp-data"
            },
            {
                "port_number": 22,
                "common_usage": "ssh"
            },
            {
                "port_number": 23,
                "common_usage": "telnet"
            },
            {
                "port_number": 117,
                "common_usage": "uucp-path"
            },
            {
                "port_number": 123,
                "common_usage": "ntp"
            },
            {
                "port_number": 515,
                "common_usage": "printer"
            },
            {
                "port_number": 520,
                "common_usage": "efs"
            },
            {
                "port_number": 1477,
                "common_usage": "ms-sna-server"
            },
            {
                "port_number": 1900,
                "common_usage": "ssdp"
            },
            {
                "port_number": 5358,
                "common_usage": "wsd"
            },
            {
                "port_number": 5678,
                "common_usage": "rrac"
            },
            {
                "port_number": 5679,
                "common_usage": "dccm"
            },
            {
                "port_number": 2460,
                "common_usage": "ms-theater"
            },
            {
                "port_number": 5720,
                "common_usage": "ms-licensing"
            },
            {
                "port_number": 2504,
                "common_usage": "wlbs"
            },
            {
                "port_number": 2525,
                "common_usage": "ms-v-worlds"
            },
            {
                "port_number": 2701,
                "common_usage": "sms-rcinfo"
            },
            {
                "port_number": 6073,
                "common_usage": "directplay8"
            },
            {
                "port_number": 2702,
                "common_usage": "sms-xfer"
            },
            {
                "port_number": 2703,
                "common_usage": "sms-chat"
            },
            {
                "port_number": 7680,
                "common_usage": "ms-do"
            },
            {
                "port_number": 2704,
                "common_usage": "sms-remctrl"
            },
            {
                "port_number": 9535,
                "common_usage": "man"
            },
            {
                "port_number": 2725,
                "common_usage": "msolap-ptp2"
            },
            {
                "port_number": 9753,
                "common_usage": "rasadv"
            },
            {
                "port_number": 2869,
                "common_usage": "icslap"
            },
            {
                "port_number": 11320,
                "common_usage": "imip-channels"
            },
            {
                "port_number": 3020,
                "common_usage": "cifs"
            },
            {
                "port_number": 47624,
                "common_usage": "directplaysrvr"
            },
            {
                "port_number": 3074,
                "common_usage": "xbox"
            },
            {
                "port_number": 3126,
                "common_usage": "ms-dotnetster"
            },
            {
                "port_number": 3132,
                "common_usage": "ms-rule-engine"
            },
            {
                "port_number": 3268,
                "common_usage": "msft-gc"
            },
            {
                "port_number": 3269,
                "common_usage": "msft-gc-ssl"
            },
            {
                "port_number": 3343,
                "common_usage": "ms-cluster-net"
            },
            {
                "port_number": 3389,
                "common_usage": "ms-wbt-server"
            },
            {
                "port_number": 3535,
                "common_usage": "ms-la"
            },
            {
                "port_number": 3540,
                "common_usage": "pnrp-port"
            },
            {
                "port_number": 3544,
                "common_usage": "teredo"
            },
            {
                "port_number": 3587,
                "common_usage": "p2pgroup"
            },
            {
                "port_number": 3702,
                "common_usage": "ws-discovery"
            },
            {
                "port_number": 3776,
                "common_usage": "dvcprov-port"
            },
            {
                "port_number": 3847,
                "common_usage": "msfw-control"
            },
            {
                "port_number": 3882,
                "common_usage": "msdts1"
            },
            {
                "port_number": 3935,
                "common_usage": "sdp-portmapper"
            },
            {
                "port_number": 4350,
                "common_usage": "net-device"
            },
            {
                "port_number": 4500,
                "common_usage": "ipsec-msft"
            },
            {
                "port_number": 5355,
                "common_usage": "llmnr"
            },
            {
                "port_number": 5357,
                "common_usage": "wsd"
            }
        ],
        "ip": "1.1.1.1",
        "has_ping": true,
        "country": "Australia",
        "city": "South Brisbane",
        "isp": "Cloudflare, Inc",
        "as_name": "AS13335 Cloudflare, Inc.",
        "lat": "-27.4766",
        "lon": "153.0166",
        "last_scanned_at": "2021-02-07T08:52:56.048955Z"
    }
]

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{lat: props.lat, lng: props.lon}}
    >
        {props.isMarkerShown && <Marker position={{lat: props.lat, lng: props.lon}}/>}
    </GoogleMap>
))

function DetailsCard({data}) {
    return (
        <Card style={{'margin': '30px 100px 20px 100px', 'padding': 10}}>
            <Form>
                <Row form>
                    <Col md={1}>
                        <FormGroup>
                            <Label for="has_ping">Has Ping</Label>
                            <Input className="rounded-circle" style={{
                                'background-color': `${data.has_ping ? 'LawnGreen' : 'red'}`,
                                width: 35,
                                marginLeft: 20
                            }} type="has_ping" name="has_ping" id="has_ping" disabled/>
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <Label for="ip">IP</Label>
                            <Input type="text" name="ip" id="ip" value={data.ip} disabled/>
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="last_scanned_at">Last Scanned At</Label>
                            <Input type="last_scanned_at" name="last_scanned_at" id="last_scanned_at"
                                   value={data.last_scanned_at} disabled/>
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <Label for="country">Country</Label>
                            <Input type="country" name="country" id="country" value={data.country} disabled/>
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <Label for="city">City</Label>
                            <Input type="city" name="city" id="city" value={data.city} disabled/>
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <Label for="isp">ISP</Label>
                            <Input type="isp" name="isp" id="isp" value={data.isp} disabled/>
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="as_name">AS Name</Label>
                            <Input type="as_name" name="as_name" id="as_name" value={data.as_name} disabled/>
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <Label for="lat">Lat</Label>
                            <Input type="lat" name="lat" id="lat" value={data.lat} disabled/>
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <Label for="lon">Lon</Label>
                            <Input type="lon" name="lon" id="lon" value={data.lon} disabled/>
                        </FormGroup>
                    </Col>
                </Row>
                <div style={{height: '300px', width: '100%'}}>
                    <MyMapComponent
                        isMarkerShown
                        lat={parseFloat(data.lat)}
                        lon={parseFloat(data.lon)}
                        googleMapURL="https://maps.googleapis.com/maps/api/js"
                        loadingElement={<div style={{height: `100%`}}/>}
                        containerElement={<div style={{height: `300px`}}/>}
                        mapElement={<div style={{height: `100%`}}/>}
                    />
                </div>
                <FormGroup>
                    <Label for="open-ports">Open Ports</Label>
                    <Form inline id="open-ports">
                        {data.open_ports.map(d => (
                            <div className="mr-2">
                                <Badge color="danger">{d.port_number}</Badge>
                                <Badge color="success">{d.common_usage}</Badge>
                            </div>
                        ))}
                    </Form>
                </FormGroup>
            </Form>
        </Card>
    )
}

function Search() {
    let q = useQuery().get('q');
    let [data, setData] = useState()
    useEffect(() => {
        fetch(`http://localhost:8000/search/?ip=${q}`)
            .then(res => res.json())
            .then(setData)
    }, [])
    console.log(data)
    return data ? <div>
        <center><h2>Search Results for {q}</h2></center>
        {data.length?data.map(d => <DetailsCard data={d}/>): <center><h4 className="mt-5">Not found</h4></center>}
    </div> : <center><h2>Loading ...</h2></center>;
}
