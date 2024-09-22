import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, StyleSheet, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Icon correctly

const Stack = createStackNavigator();

const DATA = [
  {
    id: '1',
    name: 'ARIES',
    image: require('./assets/aries.jpg'),
    dateRange: 'March 21 - April 19',
    horoscope: 'The cardinal fire sign is known for being dynamic, athletic, and having an insatiable appetite for winning. For this reason, they take great pride in being early adopters of anything and everything from the hottest new sneaker drop to the latest iPhone. And they pretty much live to compete and argue. Ram people tend to have the makings of a pro athlete, trend-setting influencer, or lawyer (former prosecutor and now Vice President Kamala Harris was born with her moon in Aries).',
  },
  {
    id: '2',
    name: 'TAURUS',
    image: require('./assets/taurus.gif'),
    dateRange: 'April 20 - May 20',
    horoscope: 'The fixed earth sign has quite a reputation for being the most stubborn one of the zodiac, but remember, there are fixed signs in each element! Thanks to their Venusian influence, Taureans are actually fairly chill. They are known for loving luxury and indulgence, being super-loyal, and enjoying art (whether they create or just appreciate it). (Sound a bit like Ariana Grande? Although her sun is in Cancer, her Venus is in sweet Taurus.) They tend to adore spa days and sweets. They are known for taking their time — whether that means having a really long fuse to get fired up, dragging their feet to take action, or being lazy and languorous when it comes to intimacy.',
  },
  {
    id: '3',
    name: 'GEMINI',
    image: require('./assets/gemini.gif'),
    dateRange: 'May 21 - June 20',
    horoscope: 'The word "mercurial" might have very well been created for Gemini, the mutable air sign that lives for communication in all forms. They are lovers of sharing whatever is on their mind, whenever, however. (Amy Schumers sun and Venus are in the loquacious air sign.) Although, do not assume they are always outgoing. They can be reserved and shy one minute and incredibly chatty the next. Given their innate mastery of language and social skills, they tend to have a wide, diverse circle of friends and gravitate to career paths that allow them to express themselves and utilize their super-buzzy brains (think marketing/PR, politics, publishing).',
  },
  {
    id: '4',
    name: 'CANCER',
    image: require('./assets/cancer.png'),
    dateRange: 'June 21 - July 22',
    horoscope: 'The cardinal water sign, influenced by the shimmering maternal moon, is one of the greatest dreamers and do-ers of the zodiac. As the ruler of the Fourth House, which deals with family and home life, they are homebodies who prioritize their connections with loved ones and achieving a lasting sense of security. But their crabbiness absolutely may come into play when they are frustrated or are otherwise catapulted into a moody headspace. They will go into their self-protective "shells," requiring time away from others to take care of themselves before they can get back to taking care of everyone else. (Mindy Kaling has a stellium — her sun, moon, and Mercury — in the endearing water sign.)',
  },
  {
  id: '5',
    name: 'LEO',
    image: require('./assets/leo.png'),
    dateRange: 'July 23 - August 22',
    horoscope: 'The fixed fire sign is ruled by the confident sun, which informs their positive, cheerful vibe. Driven and self-assured leaders, they tend to be oriented toward taking action in life, and they are born feeling like they can accomplish their wildest dreams thanks to a glimmery combo of magnetism, luck, and endlessly believing in themselves. (Former President Barack Obamas sun and Mercury are in the charismatic fire sign.) Although they might find it a bit difficult to step out of being self-focused, they can be extremely loyal and adore showering their loved ones in playful energy and all of lifes finest things.',
  },
  {
  id: '6',
    name: 'VIRGO',
    image: require('./assets/virgo.png'),
    dateRange: 'August 23 - September 22',
    horoscope: 'The mutable earth sign might very well be mistaken as an air sign, given the influence of Mercury, which means their minds are pretty much going nonstop. Lovers of lists, spreadsheets, and blank journals, Virgos are the go-to researchers, stand-out organizers, and pretty much A students of the zodiac. They tend to be perfectionists who adore working hard to make the end result of any pursuit "just right" — whether that is a recipe, a professional project, or search for a partner. (Or in the case of Beyonce, whose sun is in the earth sign, the entertainment and art we cannot get enough of). Speaking of partners and loved ones, they will often bend themselves into knots to help and be of service to their nearest and dearest.',
  },
  {
  id: '7',
    name: 'LIBRA',
    image: require('./assets/libra.png'),
    dateRange: 'September 23 - October 22',
    horoscope: 'The cardinal air sign was born to bring balance, harmony, and justice to their work and relationships. Given their Venusian influence, they are lovers of art and beauty who are known for being social butterflies and the ultimate hosts. And as the ruler of the Seventh House of Partnership, they prioritize one-on-one bonds, especially of the romantic variety. Although they tend to be interested in achieving serenity at all costs and connecting with a wide range of people, they are go-getters (Serena Williams is one!) who will stand up for what they believe in, putting in the time and energy to ensure a fair result.',
  },
  {
  id: '8',
    name: 'SCORPIO',
    image: require('./assets/scorpio.jpg'),
    dateRange: 'October 23 - November 21',
    horoscope: 'The fixed water sign is known for being one of — if not the — most private sign in the zodiac. Co-ruled by transformative Pluto and go-getter Mars, they are able to command peoples attention with their intense, powerful presence and air of mystery. They are also very much in touch with their spirituality and sexuality, but they hold their cards close to their chest. (Fiercely private family man Ryan Gosling has his sun and Mercury in the water sign.) Even after being in a relationship (platonic, romantic, or business-related) with a Scorpio for years, you might not know the whole story behind their emotional wounds and, at times, rough-around-the-edges tone. But once they are in any kind of emotional entanglement, the resolute, razor-focused sign is in it.',
  },
  {
  id: '9',
    name: 'SAGITTARIUS',
    image: require('./assets/sagittarius.png'),
    dateRange: 'November 22 - December 21',
    horoscope: 'Ruled by fortunate Jupiter, which brings a magnifying effect to everything it touches, Sagittarians are big, life-loving personalities who adore globe-trotting, being at the heart of any party, and exploring as much as life has to offer. They are also born philosophers who are endlessly passionate about their beliefs and have a tendency to hop on a soapbox frequently in order to share their worldview, often in a way that pulls no punches. (President Biden has his ascendant in Sag, which is why he was known for his no-nonsense rhetoric. "Folks!") They are natural-born comedians, entertainers, politicians, and/or generally gravitate to career paths that allow for lots of travel.',
  },
  {
  id: '10',
    name: 'CAPRICORN',
    image: require('./assets/capricorn.png'),
    dateRange: 'December 22 - January 19',
    horoscope: 'If you want someone who is perpetually motivated to achieve on your team, you are going to want to tap someone whose chart includes the cardinal earth sign Capricorn. People born with Cap are on a lifelong climb up a series of increasingly steep mountains, as they are driven to put their noses to the grindstone, succeed, and earn recognition for their diligent, no-nonsense work. In fact, it is for this reason that they have a rep for overworking themselves. But they are also extremely loyal, have a gut-busting, hilarious, dry sense of humor, and have the ability to show you exactly what is possible when you commit to a pragmatic, steady, grounded approach. John Legend is a perfect example of an industrious double Cap (it is his sun and his rising/ascendant sign).',
  },
  {
  id: '11',
    name: 'AQUARIUS',
    image: require('./assets/acquarius.gif'),
    dateRange: 'January 20 - February 18',
    horoscope: 'The fixed air sign is making plenty of headlines as we head into what is been coined the "Age of Aquarius." Quirky, generally progressive, skeptical, and social (albeit in a cool, aloof, friends-with-everyone way), those with the Water Bearers influence in their charts are wired to prioritize "we" over "me," gravitating to causes and activities that hold the greater good of society as a whole in mind. (Look no further than Alicia Keys, who has a stellium, meaning three or more signs, in Aquarius: her sun, Mercury, and Mars.) They tend to gravitate to more platonic relationships than deeply intimate entanglements and might even opt for non-traditional arrangements, as they love to strike out against convention whenever possible. And given electric Uranus involvement, they tend to be tech-savvy and science-minded.',
  },
  {
  id: '12',
    name: 'PISCES',
    image: require('./assets/pisces.png'),
    dateRange: 'February 19 - March 20',
    horoscope: 'Imagine not only being super-tuned into your own feelings but also being wired to pick up on and take on everyone elses emotions. Now you are in the headspace of a person who has the significant presence of mutable water sign Pisces in their chart. Incredibly sensitive and intuitive, they are the healers, the hopeless romantics, the artists, and the escapists of the zodiac. While they have an instinct to get swept up in otherworldly daydreams to get away from any emotional pain, the healthiest way for them to channel these deeply felt emotions is through creative outlets like theater, music, or poetry. (The late opera-loving RBGs sun and Venus were in the water sign.) And thanks to their Neptune influence, they have keen imaginations and tend to be up for exploring all things related to spirituality, the metaphysical, and psychology.',
  },
];

// List Screen
function ListScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');

  const filteredData = DATA.filter(user =>
    user.name.toLowerCase().includes(searchText.trim().toLowerCase())
  );

  return (
    <View style={styles.listSection}>
      <Text style={styles.header}>CATAN, Diether D.</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity style={styles.searchIcon}>
          <Image source={require('./assets/searchicon.png')} style={styles.iconImage} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Details', { user: item })}>
            <View style={styles.userItem}>
              <Image source={item.image} style={styles.userIcon} />
              <Text style={styles.userName}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// Detail Screen (Scrollable)
function DetailScreen({ route, navigation }) {
  const { user } = route.params;

  return (
    <View style={styles.detailSection}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          {/* Back Icon */}
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerName}>CATAN, Diether D.</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Main Profile Image (Zodiac Symbol) */}
        <Image source={user.image} style={styles.detailIcon} />

        {/* Zodiac Name */}
        <Text style={styles.zodiacName}>{user.name}</Text>

        {/* Date Range below Zodiac Name */}
        <Text style={styles.detailDateRange}>{user.dateRange}</Text>

        {/* Horoscope or profile text below the image */}
        <View style={styles.horoscopeContainer}>
          <Text style={styles.horoscopeText}>
            {user.horoscope}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="List" component={ListScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={DetailScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  detailSection: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  headerContainer: {
    width: '100%',
    backgroundColor: '#d32f2f',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
  headerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  detailIcon: {
    width: 100,
    height: 100,
    marginVertical: 20,
    borderRadius: 50, // Circle shape like the Aries image
  },
  zodiacName: {
    fontSize: 24,
    color: '#d32f2f',
    fontWeight: 'bold',
    marginTop: 10,
  },
  detailDateRange: {
    fontSize: 16,
    color: '#d32f2f',
    fontWeight: 'bold',
  },
  horoscopeContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  horoscopeText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'justify',
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  listSection: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#d32f2f',
    padding: 10,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  searchInput: {
    flex: 1,
    padding: 8,
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 8,
  },
  iconImage: {
    width: 20,
    height: 20,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
  },
  userIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  userName: {
    color: '#333',
    fontSize: 16,
  },
});