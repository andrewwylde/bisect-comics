import server from './server';

server.listen( 9002, () => {
  console.log( 'server started on port 9002 dummy' );
  console.log( ( new Date() ).toUTCString() );
} )
