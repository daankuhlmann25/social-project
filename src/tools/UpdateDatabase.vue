<template>
  <div class="update-db">
    <router-view :name="$route.params.gameId"/>
    <h1>Update the DB with 1 easy click on a button!</h1>
    <form @submit.prevent="pushToDatabase">
      <button type="submit">Send new object to DB</button>
    </form>

    <form @submit.prevent="pushSingleFile">
      <button type="submit">Update 1 item in DB</button>
    </form>

    <h2>Content of the object: (for visual reference)</h2>
    <code>
      <!-- TODO: show the content of the OBJ for visual reference -->
      {                                     <br/>
        "games" {                           <br/>
          "Sing together" {                 <br/>
            "Item": "value",                <br/>
            "Item 2": "value 2"             <br/>
          },                                <br/>
          "Trivia" {                        <br/>
            "Item": "value",                <br/>
            "Item 2": "value 2"             <br/>
          }                                 <br/>
        }                                   <br/>
      }                                     <br/>
    </code>
  </div>
</template>

<script>
import db from '@/firebase/config';

export default {
  data() {
    return {

    }
  },
  methods: {
    pushSingleFile() {
      db.collection("games").doc("sing-together").update({
        // Change this for 1 item.
        author: "Martin Beast"
      })
      .then(() => {
        console.log("Item successfully updated!");
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating item: ", error);
      });
    },
    pushToDatabase() {

        var batch = db.batch();

        // Sing together
        let gameSingTogether = db.collection("games").doc("sing-together");
        batch.set(gameSingTogether, {
            id: "Sing together",
            slug: "sing-together",
            title: "Sing together",
            subTitle: "Subtitle of the game",
            howToPlay: "You take turns answering questions. If your answer is correct, you gain one point and get to answer another question. If you get it wrong, it’s the next persons turn.",
            iconName: "music",
        });

        let addDecks1 = db.collection("games").doc("sing-together").collection("decks").doc("BurKw8KXWhdmPPth2ybV").collection("cards").doc();

        batch.set(addDecks1, {
          artist: "Beyonce",
          song: "Single Ladies (Put a Ring on It)",
          theySing: "Now put your hands up, oh, oh, oh",
          youSing: "All the single ladies",
        });

        let addDecks2 = db.collection("games").doc("sing-together").collection("decks").doc("BurKw8KXWhdmPPth2ybV").collection("cards").doc();
        batch.set(addDecks2, {
            artist: "Michael Jackson",
            song: "Billie Jean",
            theySing: "She's just a girl who claims that I am the one",
            youSing: "Billie Jean is not my lover",
        });

        // Trivia
        var gameTrivia = db.collection("games").doc("trivia");
        batch.set(gameTrivia, {
            id: "trivia",
            slug: "trivia",
            title: "Trivia",
            subTitle: "Questions and answers",
            howToPlay: "You take turns answering questions. If your answer is correct, you gain one point and get to answer another question. If you get it wrong, it’s the next persons turn.",
            iconName: "qna",
        });


        // Commit the batch
        batch
        .commit()
        .then(function() {
          console.log('Done.')
        })
        .catch(err => console.log(`There was an error: ${err}`))

    }
  }
}
</script>

<style scoped>
  h1 {
    margin: 30px 0;
  }
  form {
    text-align: center;
  }
  button{
    padding:10px 15px;
    border-radius: 3px;
    margin-bottom: 30px;
  }
  button:hover {
    background-color: #eee;
  }
</style>