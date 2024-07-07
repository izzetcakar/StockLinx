import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

const padding = 8;
const borderColor = "#636363";

const styles = StyleSheet.create({
  document: {
    padding: 30,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  pageContainer: {
    fontSize: 9,
    padding: 40,
    fontFamily: "Roboto",
  },
  pageContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "auto",
    border: `1px solid ${borderColor}`,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    borderBottom: `1px solid ${borderColor}`,
  },
  titleContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  title: {
    display: "flex",
    textAlign: "center",
    width: "50%",
    padding,
    marginVertical: "auto",
    backgroundColor: "#dfdfdf70",
  },
  title_sm: {
    display: "flex",
    textAlign: "center",
    width: 100,
    maxWidth: 100,
    minWidth: 100,
    padding,
    backgroundColor: "#dfdfdf70",
  },
  title_center: {
    display: "flex",
    textAlign: "center",
    width: "100%",
    padding,
    backgroundColor: "#dfdfdf70",
    borderBottom: `1px solid ${borderColor}`,
  },
  value: {
    display: "flex",
    textAlign: "center",
    width: "50%",
    padding,
    marginVertical: "auto",
  },
  description: {
    display: "flex",
    width: "100%",
    height: "auto",
    padding: 8,
    lineHeight: 1.5,
  },
  signContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    height: "auto",
    padding,
  },
  signContent: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "auto",
  },
  signElement: {
    width: "50%",
  },
  signText: {
    display: "flex",
    width: "100%",
    height: "auto",
  },
  xWrapper: {
    width: "100%",
    height: 1,
    borderBottom: `1px solid ${borderColor}`,
  },
  yWrapper: {
    width: 1,
    height: "100%",
    backgroundColor: "borderColor",
  },
});

export interface ProductProps {
  category: string;
  title: string;
  description: string;
}
export interface SubmissionFormProps {
  userFullName: string;
  delivererFullName: string;
  companyName: string;
  department: string;
  userStartDate: string;
  userTitle: string;
  products: ProductProps[];
  assignDate: string;
}

const Description = ({
  delivererFullName,
  userFullName,
}: {
  delivererFullName: string;
  userFullName: string;
}) => (
  <View style={styles.signContainer}>
    <View style={styles.signContent}>
      <View style={styles.signElement}>
        <Text>Teslim Alan Personel</Text>
      </View>
      <View style={styles.signElement}>
        <Text>Teslim Eden Personel</Text>
      </View>
    </View>
    <View style={styles.signContent}>
      <View style={styles.signElement}>
        <Text>İsim Soyisim : </Text>
        <Text>{userFullName}</Text>
      </View>
      <View style={styles.signElement}>
        <Text>İsim Soyisim : </Text>
        <Text>{delivererFullName}</Text>
      </View>
    </View>
    <View style={styles.signContent}>
      <View style={styles.signElement}>
        <Text>İmza : </Text>
        <Text></Text>
      </View>
      <View style={styles.signElement}>
        <Text>İmza</Text>
        <Text></Text>
      </View>
    </View>
  </View>
);

const formatDate = (dateString: string) => {
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).format(new Date(dateString));

  return formattedDate;
};

const SubmissionForm = ({
  delivererFullName,
  userFullName,
  userTitle,
  userStartDate,
  department,
  products,
  assignDate,
}: SubmissionFormProps) => (
  <Document
    style={styles.document}
    pageLayout="singlePage"
    title="Personel Zimmet Formu"
  >
    <Page size="A4" style={styles.pageContainer}>
      <View style={styles.pageContent}>
        <Text style={styles.title_center}>Personel Zimmet Formu</Text>
        <View style={styles.content}>
          <Text style={styles.title}>Personel Adı Soyadı</Text>
          <Text style={styles.value}>{userFullName}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Şube/Departman</Text>
          <Text style={styles.value}>{department}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>İşe Giriş Tarihi</Text>
          <Text style={styles.value}>{formatDate(userStartDate)}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Unvan</Text>
          <Text style={styles.value}>{userTitle}</Text>
        </View>
        <Text style={styles.title_center}>Zimmetlenen Malzemeler</Text>
        <View style={styles.content}>
          <Text style={styles.title_sm}>Ürün</Text>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Model</Text>
            <Text style={styles.title}>Açiklama</Text>
          </View>
        </View>
        {products.map((product, index) => {
          return (
            <View style={styles.content} key={index}>
              <Text style={styles.title_sm}>{product.category}</Text>
              <Text style={styles.value}>{product.title}</Text>
              <Text style={styles.value}>{product.description}</Text>
            </View>
          );
        })}
        <View style={styles.content}>
          <Text style={styles.description}>
            Yukarıda yazılı malzemeleri {formatDate(assignDate)} tarihinde
            teslim aldım. Bu tarihten itibaren verilen ürüne gelecek olan
            zarardan şahsım sorumludur.
          </Text>
        </View>
        <View style={styles.content}>
          {Description({ delivererFullName, userFullName })}
        </View>
        <Text style={styles.title_center}>Teslim Beyanı</Text>
        <View style={styles.content}>
          <Text style={styles.description}>
            {formatDate(assignDate)} tarihinde işten ayrıldığımı ve işe giriş
            tarihinde şahsıma zimmetlenmiş , yukarıda belirtilmiş malzemeleri
            eksiksiz ve sorunsuz teslim ettiğimi beyan ederim.
          </Text>
        </View>
        <View style={[styles.content, { borderBottom: "none" }]}>
          {Description({ delivererFullName, userFullName })}
        </View>
      </View>
    </Page>
  </Document>
);
export default SubmissionForm;
